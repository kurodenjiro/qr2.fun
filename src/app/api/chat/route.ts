import { desc, eq } from "drizzle-orm";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
import { db } from "@/db";
import { twitterProfiles, twitterStyleAnalyses, twitterTweetEmbeddings } from "@/db/schema";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

type StyleAnalysis = {
  wordChoice?: string;
  capitalization?: string;
  writingStyle?: string;
  emojiUsage?: string;
  personality?: string;
  punctuation?: string;
  topicRelationship?: string;
  voiceTags?: string[];
  summary?: string;
  confidence?: number;
};

function normalizeHandle(handle: string) {
  return handle.replace(/^@/, "").trim().toLowerCase();
}

function safeParseJson<T>(value: string | null | undefined): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

async function getAgentContext(handle: string) {
  const cleanHandle = normalizeHandle(handle);
  if (!cleanHandle) return null;

  const profile = await db
    .select()
    .from(twitterProfiles)
    .where(eq(twitterProfiles.handle, cleanHandle))
    .get();

  const latestAnalysis = await db
    .select()
    .from(twitterStyleAnalyses)
    .where(eq(twitterStyleAnalyses.handle, cleanHandle))
    .orderBy(desc(twitterStyleAnalyses.createdAt))
    .get();

  const recentTweets = await db
    .select({
      tweetText: twitterTweetEmbeddings.tweetText,
    })
    .from(twitterTweetEmbeddings)
    .where(eq(twitterTweetEmbeddings.handle, cleanHandle))
    .orderBy(desc(twitterTweetEmbeddings.createdAt))
    .limit(8);

  return {
    handle: cleanHandle,
    profile,
    analysis: safeParseJson<StyleAnalysis>(latestAnalysis?.analysisJson),
    sourceTweets:
      safeParseJson<Array<{ text?: string }>>(latestAnalysis?.sourceTweets)
        ?.map((tweet) => tweet.text?.trim())
        .filter((tweet): tweet is string => Boolean(tweet))
        .slice(0, 6) ?? [],
    recentTweets: recentTweets.map((tweet) => tweet.tweetText.trim()).filter(Boolean).slice(0, 6),
  };
}

function buildSystemPrompt(context: Awaited<ReturnType<typeof getAgentContext>>) {
  if (!context) {
    return [
      "You are QR2 Agent Chat.",
      "Keep responses concise, helpful, and conversational.",
      "If the requested Twitter handle has no synced profile yet, explain that the handle needs to be synced first before you can speak with that persona.",
    ].join("\n");
  }

  const profile = context.profile;
  const analysis = context.analysis;
  const exampleTweets = [...context.sourceTweets, ...context.recentTweets].slice(0, 6);

  return [
    `You are the personalized QR2 agent for @${context.handle}.`,
    `Speak as a helpful digital twin inspired by this person's public Twitter voice, but do not claim to be the real human.`,
    `Keep answers grounded in the saved profile context below. If something is unknown, say so instead of inventing it.`,
    `Use first person when appropriate for the agent persona, but avoid pretending to have private knowledge or real-world actions.`,
    "",
    "Profile:",
    `handle: @${context.handle}`,
    `display name: ${profile?.displayName ?? "unknown"}`,
    `bio: ${profile?.profileBio ?? "unknown"}`,
    `website: ${profile?.profileWebsite ?? "unknown"}`,
    "",
    "Writing style analysis:",
    `summary: ${analysis?.summary ?? "No style analysis available."}`,
    `word choice: ${analysis?.wordChoice ?? "unknown"}`,
    `writing style: ${analysis?.writingStyle ?? "unknown"}`,
    `personality: ${analysis?.personality ?? "unknown"}`,
    `capitalization: ${analysis?.capitalization ?? "unknown"}`,
    `punctuation: ${analysis?.punctuation ?? "unknown"}`,
    `emoji usage: ${analysis?.emojiUsage ?? "unknown"}`,
    `voice tags: ${(analysis?.voiceTags ?? []).join(", ") || "unknown"}`,
    "",
    "Example tweets and fragments:",
    ...exampleTweets.map((tweet, index) => `[${index + 1}] ${tweet}`),
  ].join("\n");
}

export async function POST(req: Request) {
  const { messages, handle } = (await req.json()) as {
    messages: Parameters<typeof convertToModelMessages>[0];
    handle?: string;
  };

  const context = await getAgentContext(handle ?? "");
  const modelMessages = await convertToModelMessages(messages);

  const openai = createOpenAI({
    apiKey: process.env.AI_GATEWAY_API_KEY || "",
  });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: buildSystemPrompt(context),
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
