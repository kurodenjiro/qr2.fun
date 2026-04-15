import { NextResponse } from "next/server";
import { ErrorRateLimitStrategy, Scraper } from "@the-convocation/twitter-scraper";
const NAVIGATION_TIMEOUT_MS = 12_000;
const SCRAPE_TIMEOUT_MS = 22_000;
const AUTH_TIMEOUT_MS = 8_000;

// ─── Types ───────────────────────────────────────────────────────────────────

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
  error?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalize(value: number, max: number): number {
  return Math.min(100, Math.round((value / Math.max(max, 1)) * 100));
}

function topWords(tweets: Tweet[], n = 6): string[] {
  const stop = new Set([
    "the", "a", "an", "and", "or", "but", "is", "it", "in", "on", "at", "to", "for",
    "of", "with", "that", "this", "i", "my", "you", "your", "we", "they", "are",
    "was", "be", "have", "has", "had", "do", "did", "not", "so", "what", "how",
    "just", "can", "will", "he", "she", "its", "if", "as", "by", "from", "rt", "amp",
    "https", "http", "co", "t", "s", "u", "r", "im", "its", "dont", "ive",
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
    .map(([w]) => w);
}

function sanitizeErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err ?? "unknown_error");
  return raw.replace(/\s+/g, " ").slice(0, 220);
}

type TwitterCookie = string | { [key: string]: unknown };

function parseTwitterCookies(rawCookies: string): TwitterCookie[] {
  const input = rawCookies.trim();
  if (!input) return [];

  // Support JSON array exports (e.g. ["ct0=...","auth_token=..."]).
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

  // Support table rows pasted from browser cookies panel:
  // name<TAB>value<TAB>domain...
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

  // Fallback: standard "name=value; name2=value2" cookie header format.
  return input
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean);
}

// ─── Scraper ─────────────────────────────────────────────────────────────────

async function scrapeProfile(handle: string): Promise<Tweet[]> {
  const scraper = new Scraper({
    // Avoid waiting for long server-side throttling windows.
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
        setTimeout(() => reject(new Error("Cookie auth timeout exceeded")), AUTH_TIMEOUT_MS)
      ),
    ]);
    const loggedIn = await Promise.race([
      scraper.isLoggedIn(),
      new Promise<false>((resolve) => setTimeout(() => resolve(false), AUTH_TIMEOUT_MS)),
    ]);
    if (!loggedIn) {
      throw new Error("Twitter cookie auth failed (cookies expired/invalid; refresh ct0 + auth_token)");
    }
  } else if (username && password) {
    await Promise.race([
      scraper.login(username, password, email),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Credential login timeout exceeded")), AUTH_TIMEOUT_MS)
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
    }>
  ) => {
    for await (const tw of stream) {
      const text = (tw.text ?? "").trim();
      if (text.length <= 5 || tw.isRetweet) continue;

      tweets.push({
        text,
        likes: tw.likes ?? 0,
        retweets: tw.retweets ?? 0,
        replies: tw.replies ?? 0,
        isReply: Boolean(tw.isReply),
        timestamp: tw.timeParsed ? tw.timeParsed.toISOString() : "",
      });

      if (tweets.length >= 40) break;
    }
  };

  try {
    await collectFromStream(scraper.getTweetsAndReplies(handle, 50));
  } catch (err) {
    // Some X profiles intermittently 404 on replies/timeline endpoints.
    // Retry with tweets-only stream before failing the whole request.
    console.warn("[DNA scraper] getTweetsAndReplies failed, retrying tweets-only", sanitizeErrorMessage(err));
    await collectFromStream(scraper.getTweets(handle, 50));
  }

  if (tweets.length === 0) {
    throw new Error("No tweets captured from scraper");
  }

  try {
    const profile = await scraper.getProfile(handle);
    if (!profile?.userId) {
      throw new Error("Profile lookup returned empty result");
    }
  } catch (err) {
    throw new Error(`Scraper blocked or profile unavailable: ${sanitizeErrorMessage(err)}`);
  }

  return tweets;
}

// ─── DNA Embedding ────────────────────────────────────────────────────────────

function deterministicDNA(handle: string): DNAResult {
  const seed = handle.toLowerCase();
  const score = (o: number) => {
    let s = 0;
    for (let i = 0; i < seed.length; i++) s += seed.charCodeAt(i) * (i + o);
    return s % 100;
  };
  return {
    handle,
    timestamp: new Date().toISOString(),
    scrapedAt: null,
    tweetCount: 0,
    replyCount: 0,
    traits: [
      { label: "AGGRO_KINETIC", value: score(1) },
      { label: "NEURAL_LOAD", value: score(2) },
      { label: "COGNITIVE_BIAS", value: score(3) },
      { label: "CYBER_STASIS", value: score(4) },
      { label: "SIGNAL_DEPTH", value: score(5) },
      { label: "FREQ_PULSE", value: score(6) },
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

  const posts = tweets.filter((t) => !t.isReply);
  const replies = tweets.filter((t) => t.isReply);

  const avgLikes = posts.reduce((s, t) => s + t.likes, 0) / Math.max(posts.length, 1);
  const avgRetweets = posts.reduce((s, t) => s + t.retweets, 0) / Math.max(posts.length, 1);
  const avgReplies = posts.reduce((s, t) => s + t.replies, 0) / Math.max(posts.length, 1);
  const avgEngagement = Math.round(avgLikes + avgRetweets + avgReplies);

  const maxEng = Math.max(...tweets.map((t) => t.likes + t.retweets), 1);
  const aggroKinetic = normalize(avgLikes + avgRetweets, maxEng);

  const allText = tweets.map((t) => t.text).join(" ");
  const allWords = allText.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter(Boolean);
  const vocabRichness = normalize(new Set(allWords).size, allWords.length);

  const replyRatio = Math.round((replies.length / Math.max(tweets.length, 1)) * 100);

  const ts = tweets.map((t) => t.timestamp).filter(Boolean).map((t) => new Date(t).getTime()).filter((n) => !isNaN(n));
  const latest = ts.length ? Math.max(...ts) : 0;
  const daysSince = latest ? (Date.now() - latest) / 86_400_000 : 365;
  const cyberStasis = Math.max(0, 100 - Math.round(daysSince * 2));

  const avgLen = allText.length / Math.max(tweets.length, 1);
  const signalDepth = normalize(avgLen, 280);

  const engs = posts.map((t) => t.likes + t.retweets);
  const mean = engs.reduce((s, v) => s + v, 0) / Math.max(engs.length, 1);
  const stddev = Math.sqrt(engs.reduce((s, v) => s + (v - mean) ** 2, 0) / Math.max(engs.length, 1));
  const freqPulse = Math.max(0, 100 - normalize(stddev, mean + 1));

  const influence = Math.round(aggroKinetic * 0.4 + vocabRichness * 0.2 + cyberStasis * 0.2 + signalDepth * 0.2);

  return {
    handle,
    timestamp: new Date().toISOString(),
    scrapedAt: new Date().toISOString(),
    tweetCount: posts.length,
    replyCount: replies.length,
    traits: [
      { label: "AGGRO_KINETIC", value: aggroKinetic },
      { label: "NEURAL_LOAD", value: vocabRichness },
      { label: "COGNITIVE_BIAS", value: replyRatio },
      { label: "CYBER_STASIS", value: cyberStasis },
      { label: "SIGNAL_DEPTH", value: signalDepth },
      { label: "FREQ_PULSE", value: freqPulse },
    ],
    metadata: {
      frequency: `${(influence * 5 + 100).toFixed(1)}Hz`,
      sync_rate: `${Math.min(99, Math.round(avgEngagement / 10))}%`,
      node: `0x${influence.toString(16).toUpperCase()}_PRIME`,
      top_words: topWords(tweets),
      influence_score: influence,
      avg_engagement: avgEngagement,
    },
    rawSample: tweets.slice(0, 3).map((t) => t.text.slice(0, 120)),
  };
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");

  if (!handle) {
    return NextResponse.json({ error: "Handle required" }, { status: 400 });
  }

  const cleanHandle = handle.replace(/^@/, "").trim();

  try {
    const tweets = await Promise.race([
      scrapeProfile(cleanHandle),
      new Promise<Tweet[]>((_, reject) => {
        setTimeout(() => reject(new Error("Scrape timeout exceeded")), SCRAPE_TIMEOUT_MS);
      }),
    ]);
    const dna = convertToDNA(cleanHandle, tweets);
    return NextResponse.json(dna);
  } catch (err) {
    console.error("[DNA scraper error]", err);
    const fallback = deterministicDNA(cleanHandle);
    const reason = sanitizeErrorMessage(err);
    return NextResponse.json({
      ...fallback,
      error: `Scrape failed (${reason}) — using deterministic fallback`,
    });
  }
}
