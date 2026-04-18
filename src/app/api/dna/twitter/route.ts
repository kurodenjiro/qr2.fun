import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { embed, generateText } from "ai";
import { ErrorRateLimitStrategy, Scraper } from "@the-convocation/twitter-scraper";
import { db } from "@/db";
import { ensureTwitterVectorTables } from "@/db/bootstrap";
import { aiProvider } from "@/lib/ai";
import {
  twitterStyleAnalyses,
  twitterProfiles,
  twitterTweetEmbeddings,
} from "@/db/schema";

export const maxDuration = 60;

const SCRAPE_TIMEOUT_MS = 22_000;
const AUTH_TIMEOUT_MS = 8_000;
const MAX_INGESTED_TWEETS = 20;
const TWEET_EMBEDDING_MODEL = "text-embedding-3-small";
const STYLE_MODEL = "gpt-4o-mini";

interface Tweet {
  text: string;
  likes: number;
  retweets: number;
  replies: number;
  isReply: boolean;
  timestamp: string;
}

interface DNAResult {
  handle: string;
  timestamp: string;
  scrapedAt: string | null;
  profileImageUrl?: string | null;
  tweetCount: number;
  replyCount: number;
  traits: { label: string; value: number }[];
  metadata: {
    frequency: string;
    sync_rate: string;
    node: string;
    top_words: string[];
    influence_score: number;
    avg_engagement: number;
  };
  rawSample: string[];
  ingestion?: {
    topic: string | null;
    requestedLimit: number;
    ingestedCount: number;
    vectorModel: string;
    styleModel: string;
    profileSaved: boolean;
    analysis: StyleAnalysisResult;
  };
  error?: string;
}

interface StyleAnalysisResult {
  wordChoice: string;
  capitalization: string;
  writingStyle: string;
  emojiUsage: string;
  personality: string;
  punctuation: string;
  topicRelationship: string;
  voiceTags: string[];
  summary: string;
  confidence: number;
}

interface TweetEmbeddingRow {
  id: string;
  handle: string;
  topic: string | null;
  tweetText: string;
  isReply: boolean;
  likes: number;
  retweets: number;
  replies: number;
  tweetTimestamp: string | null;
  embedding: string;
  model: string;
}

interface ScrapedTwitterProfile {
  avatar?: string;
  banner?: string;
  biography?: string;
  name?: string;
  url?: string;
  username?: string;
  userId?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalize(value: number, max: number): number {
  return Math.min(100, Math.round((value / Math.max(max, 1)) * 100));
}

function topWords(tweets: Tweet[], n = 6): string[] {
  const stop = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "is",
    "it",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "that",
    "this",
    "i",
    "my",
    "you",
    "your",
    "we",
    "they",
    "are",
    "was",
    "be",
    "have",
    "has",
    "had",
    "do",
    "did",
    "not",
    "so",
    "what",
    "how",
    "just",
    "can",
    "will",
    "he",
    "she",
    "its",
    "if",
    "as",
    "by",
    "from",
    "rt",
    "amp",
    "https",
    "http",
    "co",
    "t",
    "s",
    "u",
    "r",
    "im",
    "dont",
    "ive",
  ]);

  const freq: Record<string, number> = {};
  for (const tw of tweets) {
    const words = tw.text
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, "")
      .replace(/[^a-z0-9\s#@]/g, " ")
      .split(/\s+/);
    for (const w of words) {
      if (w.length > 2 && !stop.has(w)) freq[w] = (freq[w] || 0) + 1;
    }
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word]) => word);
}

function sanitizeErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err ?? "unknown_error");
  return raw.replace(/\s+/g, " ").slice(0, 220);
}

function safeParseJson<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

type TwitterCookie = string | { [key: string]: unknown };

function parseTwitterCookies(rawCookies: string): TwitterCookie[] {
  const input = rawCookies.trim();
  if (!input) return [];

  if (input.startsWith("[")) {
    try {
      const parsed = JSON.parse(input) as unknown;
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => {
            if (typeof item === "string") {
              const normalized = item.trim();
              return normalized || null;
            }
            if (item && typeof item === "object") {
              return item as TwitterCookie;
            }
            return null;
          })
          .filter((item): item is TwitterCookie => Boolean(item));
      }
    } catch {
      // Fall through to line-based parsing.
    }
  }

  if (input.includes("\t") || input.includes("\n")) {
    const fromRows = input
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.split("\t"))
      .filter((cols) => cols.length >= 2 && cols[0] && cols[1])
      .map(([name, value]) => `${name.trim()}=${value.trim().replace(/^"(.*)"$/, "$1")}`);
    if (fromRows.length > 0) return fromRows;
  }

  return input
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean);
}

function tokenizeTopic(topic: string): string[] {
  return topic
    .toLowerCase()
    .split(/[^a-z0-9#@]+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2);
}

function rankTweetForIngestion(tweet: Tweet, topicTokens: string[]): number {
  const text = tweet.text.toLowerCase();
  const engagement = tweet.likes * 2 + tweet.retweets * 3 + tweet.replies;
  const topicHits = topicTokens.reduce((score, token) => score + (text.includes(token) ? 1 : 0), 0);
  const replyBoost = tweet.isReply ? 4 : 0;
  const recencyBoost = tweet.timestamp ? 1 : 0;

  return topicHits * 20 + replyBoost + recencyBoost + Math.min(engagement, 25);
}

function selectTweetsForIngestion(tweets: Tweet[], topic: string, limit: number): Tweet[] {
  const topicTokens = tokenizeTopic(topic);
  const unique = Array.from(
    new Map(
      tweets
        .filter((tweet) => tweet.text.trim().length > 5)
        .map((tweet) => [tweet.text.trim(), tweet] as const),
    ).values(),
  );

  const scored = unique
    .map((tweet) => ({ tweet, score: rankTweetForIngestion(tweet, topicTokens) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (new Date(b.tweet.timestamp || 0).getTime() || 0) - (new Date(a.tweet.timestamp || 0).getTime() || 0);
    });

  return scored.slice(0, Math.min(limit, MAX_INGESTED_TWEETS)).map((item) => item.tweet);
}

function buildTweetEmbeddingInput(handle: string, topic: string, tweet: Tweet): string {
  const topicLine = topic ? `topic: ${topic}\n` : "";
  const context = [
    `handle: @${handle}`,
    topicLine.trim(),
    `kind: ${tweet.isReply ? "reply" : "tweet"}`,
    tweet.timestamp ? `timestamp: ${tweet.timestamp}` : "",
    `likes: ${tweet.likes}`,
    `retweets: ${tweet.retweets}`,
    `replies: ${tweet.replies}`,
    `content: ${tweet.text}`,
  ]
    .filter(Boolean)
    .join("\n");

  return context;
}

function buildStylePrompt(handle: string, topic: string, tweets: Tweet[]): string {
  const sample = tweets
    .map((tweet, index) =>
      [
        `[${index + 1}] ${tweet.isReply ? "reply" : "tweet"}`,
        tweet.timestamp ? `time=${tweet.timestamp}` : null,
        `likes=${tweet.likes}`,
        `retweets=${tweet.retweets}`,
        `replies=${tweet.replies}`,
        tweet.text,
      ]
        .filter(Boolean)
        .join(" | "),
    )
    .join("\n");

  return [
    `Analyze the writing style of @${handle}${topic ? ` around the topic "${topic}"` : ""}.`,
    "Focus on word choice, capitalization, writing style, emoji usage, punctuation, and personality.",
    "Return ONLY valid JSON with these exact keys:",
    `wordChoice, capitalization, writingStyle, emojiUsage, personality, punctuation, topicRelationship, voiceTags, summary, confidence`,
    "Rules:",
    "- voiceTags must be an array of short strings.",
    "- confidence must be a number between 0 and 1.",
    "- Keep summary concise and practical for downstream agent use.",
    "",
    "Tweets:",
    sample,
  ].join("\n");
}

function fallbackStyleAnalysis(handle: string, topic: string, tweets: Tweet[]): StyleAnalysisResult {
  const joined = tweets.map((tweet) => tweet.text).join(" ");
  const emojiMatches = joined.match(/\p{Extended_Pictographic}/gu) ?? [];
  const shoutMatches = joined.match(/\b[A-Z]{3,}\b/g) ?? [];
  const exclamationCount = (joined.match(/!/g) ?? []).length;
  const questionCount = (joined.match(/\?/g) ?? []).length;
  const replyShare = tweets.filter((tweet) => tweet.isReply).length / Math.max(tweets.length, 1);

  return {
    wordChoice: topWords(tweets, 8).join(", ") || "general conversational vocabulary",
    capitalization: shoutMatches.length > 0 ? "Uses occasional uppercase emphasis" : "Mostly standard capitalization",
    writingStyle: replyShare > 0.4 ? "Conversational, responsive, and dialog-heavy" : "Broadcast-like and declarative",
    emojiUsage: emojiMatches.length > 0 ? "Uses emojis sparingly but intentionally" : "Minimal emoji usage",
    personality:
      exclamationCount + questionCount > 8
        ? "Energetic, reactive, and expressive"
        : "Measured, direct, and low-noise",
    punctuation: exclamationCount > questionCount ? "Exclamation-forward" : "Balanced punctuation with occasional questions",
    topicRelationship: topic
      ? `Tweets appear to orbit the topic "${topic}" with varying levels of direct mention.`
      : "No explicit topic bias provided; style reflects the broader account voice.",
    voiceTags: Array.from(
      new Set([
        replyShare > 0.4 ? "reply-heavy" : "broadcast-heavy",
        emojiMatches.length > 0 ? "emoji-aware" : "emoji-sparse",
        shoutMatches.length > 0 ? "caps-emphasis" : "plaincase",
        exclamationCount > 3 ? "high-energy" : "steady",
      ]),
    ),
    summary: `Fallback style profile for @${handle} generated from ${tweets.length} tweets.`,
    confidence: 0.35,
  };
}

function deterministicDNA(handle: string): DNAResult {
  const seed = handle.toLowerCase();
  const score = (offset: number) => {
    let total = 0;
    for (let i = 0; i < seed.length; i++) total += seed.charCodeAt(i) * (i + offset);
    return total % 100;
  };

  return {
    handle,
    timestamp: new Date().toISOString(),
    scrapedAt: null,
    tweetCount: 0,
    replyCount: 0,
    traits: [
      { label: "ENGAGEMENT_VELOCITY", value: score(1) },
      { label: "VOCAB_VARIETY", value: score(2) },
      { label: "REPLY_WEIGHT", value: score(3) },
      { label: "RECENCY_SIGNAL", value: score(4) },
      { label: "CONTENT_DEPTH", value: score(5) },
      { label: "CADENCE_STABILITY", value: score(6) },
    ],
    metadata: {
      frequency: `${(score(5) * 5 + 100).toFixed(1)}Hz`,
      sync_rate: `${score(6)}%`,
      node: `0x${score(7).toString(16).toUpperCase()}_PRIME`,
      top_words: [],
      influence_score: score(3),
      avg_engagement: 0,
    },
    rawSample: [],
  };
}

function convertToDNA(handle: string, tweets: Tweet[]): DNAResult {
  if (tweets.length === 0) return deterministicDNA(handle);

  const posts = tweets.filter((tweet) => !tweet.isReply);
  const replies = tweets.filter((tweet) => tweet.isReply);

  const avgLikes = posts.reduce((sum, tweet) => sum + tweet.likes, 0) / Math.max(posts.length, 1);
  const avgRetweets = posts.reduce((sum, tweet) => sum + tweet.retweets, 0) / Math.max(posts.length, 1);
  const avgReplies = posts.reduce((sum, tweet) => sum + tweet.replies, 0) / Math.max(posts.length, 1);
  const avgEngagement = Math.round(avgLikes + avgRetweets + avgReplies);

  const maxEng = Math.max(...tweets.map((tweet) => tweet.likes + tweet.retweets), 1);
  const aggroKinetic = normalize(avgLikes + avgRetweets, maxEng);

  const allText = tweets.map((tweet) => tweet.text).join(" ");
  const allWords = allText
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const vocabRichness = normalize(new Set(allWords).size, allWords.length);

  const replyRatio = Math.round((replies.length / Math.max(tweets.length, 1)) * 100);

  const timestamps = tweets
    .map((tweet) => tweet.timestamp)
    .filter(Boolean)
    .map((stamp) => new Date(stamp).getTime())
    .filter((stamp) => !Number.isNaN(stamp));
  const latest = timestamps.length ? Math.max(...timestamps) : 0;
  const daysSince = latest ? (Date.now() - latest) / 86_400_000 : 365;
  const cyberStasis = Math.max(0, 100 - Math.round(daysSince * 2));

  const avgLen = allText.length / Math.max(tweets.length, 1);
  const signalDepth = normalize(avgLen, 280);

  const engagements = posts.map((tweet) => tweet.likes + tweet.retweets);
  const mean = engagements.reduce((sum, value) => sum + value, 0) / Math.max(engagements.length, 1);
  const stddev = Math.sqrt(
    engagements.reduce((sum, value) => sum + (value - mean) ** 2, 0) / Math.max(engagements.length, 1),
  );
  const freqPulse = Math.max(0, 100 - normalize(stddev, mean + 1));

  const influence = Math.round(aggroKinetic * 0.4 + vocabRichness * 0.2 + cyberStasis * 0.2 + signalDepth * 0.2);

  return {
    handle,
    timestamp: new Date().toISOString(),
    scrapedAt: new Date().toISOString(),
    tweetCount: posts.length,
    replyCount: replies.length,
    traits: [
      { label: "ENGAGEMENT_VELOCITY", value: aggroKinetic },
      { label: "VOCAB_VARIETY", value: vocabRichness },
      { label: "REPLY_WEIGHT", value: replyRatio },
      { label: "RECENCY_SIGNAL", value: cyberStasis },
      { label: "CONTENT_DEPTH", value: signalDepth },
      { label: "CADENCE_STABILITY", value: freqPulse },
    ],
    metadata: {
      frequency: `${(influence * 5 + 100).toFixed(1)}Hz`,
      sync_rate: `${Math.min(99, Math.round(avgEngagement / 10))}%`,
      node: `0x${influence.toString(16).toUpperCase()}_PRIME`,
      top_words: topWords(tweets),
      influence_score: influence,
      avg_engagement: avgEngagement,
    },
    rawSample: tweets.slice(0, 3).map((tweet) => tweet.text.slice(0, 120)),
  };
}

async function scrapeProfile(handle: string): Promise<{ tweets: Tweet[]; profile: ScrapedTwitterProfile }> {
  const scraper = new Scraper({
    rateLimitStrategy: new ErrorRateLimitStrategy(),
  });

  const cookies = process.env.TWITTER_COOKIES?.trim();
  const username = process.env.TWITTER_USERNAME?.trim();
  const password = process.env.TWITTER_PASSWORD?.trim();
  const email = process.env.TWITTER_EMAIL?.trim();

  if (cookies) {
    const cookieList = parseTwitterCookies(cookies);
    await Promise.race([
      scraper.setCookies(cookieList),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Cookie auth timeout exceeded")), AUTH_TIMEOUT_MS),
      ),
    ]);
    const loggedIn = await Promise.race([
      scraper.isLoggedIn(),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), AUTH_TIMEOUT_MS)),
    ]);
    if (!loggedIn) {
      throw new Error("Twitter cookie auth failed (cookies expired/invalid; refresh ct0 + auth_token)");
    }
  } else if (username && password) {
    await Promise.race([
      scraper.login(username, password, email),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Credential login timeout exceeded")), AUTH_TIMEOUT_MS),
      ),
    ]);
  }

  const tweets: Tweet[] = [];
  const collectFromStream = async (
    stream: AsyncIterable<{
      text?: string;
      likes?: number;
      retweets?: number;
      replies?: number;
      isReply?: boolean;
      isRetweet?: boolean;
      timeParsed?: Date | null;
    }>,
  ) => {
    for await (const item of stream) {
      const text = (item.text ?? "").trim();
      if (text.length <= 5 || item.isRetweet) continue;

      tweets.push({
        text,
        likes: item.likes ?? 0,
        retweets: item.retweets ?? 0,
        replies: item.replies ?? 0,
        isReply: Boolean(item.isReply),
        timestamp: item.timeParsed ? item.timeParsed.toISOString() : "",
      });

      if (tweets.length >= 50) break;
    }
  };

  try {
    await collectFromStream(scraper.getTweets(handle, 50));
  } catch (err) {
    throw new Error(`Tweet scrape failed: ${sanitizeErrorMessage(err)}`);
  }

  if (tweets.length === 0) {
    throw new Error("No tweets captured from scraper");
  }

  let profile: ScrapedTwitterProfile;
  try {
    profile = (await scraper.getProfile(handle)) as ScrapedTwitterProfile;
    if (!profile?.userId) {
      throw new Error("Profile lookup returned empty result");
    }
  } catch (err) {
    throw new Error(`Scraper blocked or profile unavailable: ${sanitizeErrorMessage(err)}`);
  }

  return { tweets, profile };
}

async function saveTweetEmbeddings(handle: string, topic: string, tweets: Tweet[]) {
  const results = await Promise.allSettled(
    tweets.map(async (tweet) => {
      const { embedding } = await embed({
        model: aiProvider.textEmbeddingModel('tweet-embedding'),
        value: buildTweetEmbeddingInput(handle, topic, tweet),
      });

      return {
        id: randomUUID(),
        handle,
        topic: topic || null,
        tweetText: tweet.text,
        isReply: tweet.isReply,
        likes: tweet.likes,
        retweets: tweet.retweets,
        replies: tweet.replies,
        tweetTimestamp: tweet.timestamp || null,
        embedding: JSON.stringify(embedding),
        model: TWEET_EMBEDDING_MODEL,
      } satisfies TweetEmbeddingRow;
    }),
  );

  const rows = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value as TweetEmbeddingRow);

  if (rows.length > 0) {
    await db.insert(twitterTweetEmbeddings).values(rows);
  }

  return rows.length;
}

async function analyzeWritingStyle(handle: string, topic: string, tweets: Tweet[]): Promise<StyleAnalysisResult> {
  const fallback = fallbackStyleAnalysis(handle, topic, tweets);

  if (!process.env.AI_GATEWAY_API_KEY?.trim()) {
    return fallback;
  }

  try {
    const result = await generateText({
      model: aiProvider.languageModel('style-analysis'),
      temperature: 0.2,
      system:
        "You analyze tweet writing style for downstream agents. Return only strict JSON and no markdown.",
      prompt: buildStylePrompt(handle, topic, tweets),
    });

    const parsed = safeParseJson<Partial<StyleAnalysisResult>>(result.text);
    if (!parsed) return fallback;

    return {
      wordChoice: parsed.wordChoice ?? fallback.wordChoice,
      capitalization: parsed.capitalization ?? fallback.capitalization,
      writingStyle: parsed.writingStyle ?? fallback.writingStyle,
      emojiUsage: parsed.emojiUsage ?? fallback.emojiUsage,
      personality: parsed.personality ?? fallback.personality,
      punctuation: parsed.punctuation ?? fallback.punctuation,
      topicRelationship: parsed.topicRelationship ?? fallback.topicRelationship,
      voiceTags: Array.isArray(parsed.voiceTags) ? parsed.voiceTags.filter(Boolean) : fallback.voiceTags,
      summary: parsed.summary ?? fallback.summary,
      confidence:
        typeof parsed.confidence === "number" && Number.isFinite(parsed.confidence)
          ? Math.min(1, Math.max(0, parsed.confidence))
          : fallback.confidence,
    };
  } catch (err) {
    console.warn("[DNA scraper] style analysis failed", sanitizeErrorMessage(err));
    return fallback;
  }
}

async function saveStyleAnalysis(
  handle: string,
  topic: string,
  tweets: Tweet[],
  analysis: StyleAnalysisResult,
  profileImageUrl: string | null,
) {
  const profileEmbeddingSource = [
    `handle: @${handle}`,
    topic ? `topic: ${topic}` : "",
    `summary: ${analysis.summary}`,
    `wordChoice: ${analysis.wordChoice}`,
    `capitalization: ${analysis.capitalization}`,
    `writingStyle: ${analysis.writingStyle}`,
    `emojiUsage: ${analysis.emojiUsage}`,
    `personality: ${analysis.personality}`,
    `punctuation: ${analysis.punctuation}`,
    `voiceTags: ${(analysis.voiceTags ?? []).join(", ")}`,
    "",
    "tweets:",
    ...tweets.map((tweet, index) => `[${index + 1}] ${tweet.text}`),
  ]
    .filter(Boolean)
    .join("\n");

  let embedding = "[0]";

  if (process.env.AI_GATEWAY_API_KEY?.trim()) {
    try {
      const response = await embed({
        model: aiProvider.textEmbeddingModel('tweet-embedding'),
        value: profileEmbeddingSource,
      });
      embedding = JSON.stringify(response.embedding);
    } catch (err) {
      console.warn("Failed to generate embedding during saveStyleAnalysis, using fallback", err);
    }
  }

  await db.insert(twitterStyleAnalyses).values({
    id: randomUUID(),
    handle,
    topic: topic || null,
    profileImageUrl,
    analysisJson: JSON.stringify(analysis),
    profileEmbedding: JSON.stringify(embedding),
    sourceTweets: JSON.stringify(
      tweets.map((tweet) => ({
        text: tweet.text,
        isReply: tweet.isReply,
        likes: tweet.likes,
        retweets: tweet.retweets,
        replies: tweet.replies,
        timestamp: tweet.timestamp,
      })),
    ),
    model: `${STYLE_MODEL} + ${TWEET_EMBEDDING_MODEL}`,
  });
}

async function saveTwitterProfile(handle: string, profile: ScrapedTwitterProfile) {
  await db
    .insert(twitterProfiles)
    .values({
      handle,
      username: profile.username ?? null,
      displayName: profile.name ?? null,
      profileImageUrl: profile.avatar ?? null,
      profileBannerUrl: profile.banner ?? null,
      profileBio: profile.biography ?? null,
      profileWebsite: profile.url ?? null,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: twitterProfiles.handle,
      set: {
        username: profile.username ?? null,
        displayName: profile.name ?? null,
        profileImageUrl: profile.avatar ?? null,
        profileBannerUrl: profile.banner ?? null,
        profileBio: profile.biography ?? null,
        profileWebsite: profile.url ?? null,
        updatedAt: new Date(),
      },
    });
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  const topic = searchParams.get("topic")?.trim() ?? "";
  const requestedLimit = Number.parseInt(searchParams.get("limit") ?? "20", 10);
  const requestedLimitSafe = Number.isFinite(requestedLimit) ? requestedLimit : MAX_INGESTED_TWEETS;
  const limit = Math.min(MAX_INGESTED_TWEETS, Math.max(1, requestedLimitSafe));

  if (!handle) {
    return NextResponse.json({ error: "Handle required" }, { status: 400 });
  }

  const cleanHandle = handle.replace(/^@/, "").trim().toLowerCase();

  try {
    await ensureTwitterVectorTables();

    const scraped = await Promise.race([
      scrapeProfile(cleanHandle),
      new Promise<{ tweets: Tweet[]; profile: ScrapedTwitterProfile }>((_, reject) => {
        setTimeout(() => reject(new Error("Scrape timeout exceeded")), SCRAPE_TIMEOUT_MS);
      }),
    ]);

    const { tweets, profile } = scraped;
    const selectedTweets = selectTweetsForIngestion(tweets, topic, limit);
    const dna = convertToDNA(cleanHandle, selectedTweets);
    await saveTwitterProfile(cleanHandle, profile);

    const analysis = await analyzeWritingStyle(cleanHandle, topic, selectedTweets);
    let tweetEmbeddingCount = 0;

    // Always save the analysis (using fallback values if needed) so the UI has data
    await saveStyleAnalysis(cleanHandle, topic, selectedTweets, analysis, profile.avatar ?? null);
    const profileSaved = true;

    if (process.env.AI_GATEWAY_API_KEY?.trim()) {
      tweetEmbeddingCount = await saveTweetEmbeddings(cleanHandle, topic, selectedTweets);
    }

    return NextResponse.json({
      ...dna,
      profileImageUrl: profile.avatar ?? null,
      ingestion: {
        topic: topic || null,
        requestedLimit: limit,
        ingestedCount: tweetEmbeddingCount,
        vectorModel: TWEET_EMBEDDING_MODEL,
        styleModel: STYLE_MODEL,
        profileSaved,
        analysis,
      },
    });
  } catch (err) {
    console.error("[DNA scraper error]", err);
    const fallback = deterministicDNA(cleanHandle);
    const reason = sanitizeErrorMessage(err);
    return NextResponse.json({
      ...fallback,
      profileImageUrl: null,
      ingestion: {
        topic: topic || null,
        requestedLimit: limit,
        ingestedCount: 0,
        vectorModel: TWEET_EMBEDDING_MODEL,
        styleModel: STYLE_MODEL,
        profileSaved: false,
        analysis: fallbackStyleAnalysis(cleanHandle, topic, []),
      },
      error: `Scrape failed (${reason}) — using deterministic fallback`,
    });
  }
}
