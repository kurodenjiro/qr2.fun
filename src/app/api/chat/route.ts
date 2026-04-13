import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: "You are the NEON_GENESIS Forge AI. Your job is to help users understand their telemetry and data metrics. Speak in a slightly robotic, high-tech persona.",
    messages,
  });

  return result.toTextStreamResponse();
}
