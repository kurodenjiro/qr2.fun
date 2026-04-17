import { generateImage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const provider = createOpenAI({ apiKey: "test" });

async function test() {
  await generateImage({
    model: provider.imageModel("dall-e-3"),
    prompt: {
      text: "hello",
      images: [Buffer.from("")],
    },
    aspectRatio: "2:3"
  });
}
