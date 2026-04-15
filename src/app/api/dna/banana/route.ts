import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import { GoogleGenAI, createPartFromBase64 } from "@google/genai";
import QRCode from "qrcode";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { ensureTwitterVectorTables } from "@/db/bootstrap";
import { artStyles, twitterProfiles } from "@/db/schema";

export const maxDuration = 90;
function getGeminiClient() {
  const geminiApiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY or GOOGLE_API_KEY is required for Banana generation");
  }
  return new GoogleGenAI({ apiKey: geminiApiKey });
}

type BananaRequest = {
  handle?: string;
  styleId?: string;
  qrText?: string;
};

type TwitterProfileRow = {
  handle: string;
  username?: string | null;
  displayName?: string | null;
  profileImageUrl?: string | null;
  profileBannerUrl?: string | null;
  profileBio?: string | null;
  profileWebsite?: string | null;
};

function normalizeHandle(handle: string) {
  return handle.replace(/^@/, "").trim();
}

function normalizeAvatarUrl(url: string) {
  return url.replace(/_normal(\.(?:jpg|jpeg|png|webp))$/i, "$1");
}

async function fetchImageBuffer(url: string) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

function sanitizeErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err ?? "unknown_error");
  return raw.replace(/\s+/g, " ").slice(0, 220);
}

function buildPrompt() {
  return [
    `A striking, minimalist high-contrast monochrome ink wash illustration, rendered in the specific artistic style of example.jpg, depicting the portrait of RegenRene (RegenRene.jpg).`,
    `The focus is on the dramatic, high-contrast ink application and the exceptionally glossy, lacquer-like finish on the hair with dramatic reflections.`,
    `The background is pure white.`,
    `The composition of the subject's clothing is central: A complex, dense QR code pattern, sourced directly from qr2r.png, is integrated as a non-distinct, integrated element in the center of the torso (chest area).`,
    `Crucially, this QR code does not have hard, defined geometric borders.`,
    `Its peripheral squares dissolve, fracture, and bleed seamlessly into the surrounding integrated minimalist abstract ink wash patterns and splatters.`,
    `These surrounding ink elements appear to grow out of and merge with the QR code modules, creating a single, unified textured garment that flows dynamically around the three-dimensional curves of the body.`,
    `The sparse facial features of RegenRene remain minimally integrated at the neck with the surrounding patterns.`,
    `All lines are defined and confident.`,
    ``,
    `Input images: 1) /Users/mac/dev/qr2.fun/public/images/dna/example-reference.jpg, 2) Twitter avatar image fetched from the synced profile, 3) QR code image generated from the current qrText`,
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BananaRequest;
    const cleanHandle = normalizeHandle(body.handle ?? "");
    const styleId = body.styleId?.trim() || "";
    const qrText = body.qrText?.trim() || `https://qr2.fun/${cleanHandle || "anonymous"}`;

    if (!cleanHandle) {
      return NextResponse.json({ error: "Handle required" }, { status: 400 });
    }

    await ensureTwitterVectorTables();

    const profile = (await db
      .select()
      .from(twitterProfiles)
      .where(eq(twitterProfiles.handle, cleanHandle))
      .get()) as TwitterProfileRow | undefined;

    if (!profile?.profileImageUrl) {
      return NextResponse.json({ error: "Twitter profile image not available. Sync the handle first." }, { status: 404 });
    }

    const style = styleId
      ? await db.select().from(artStyles).where(eq(artStyles.id, styleId)).get()
      : null;

    const styleName = style?.name ?? "DNA_STYLE";
    const styleDescription = style?.description ?? "Monochrome organic pattern";

    const referencePath = join(process.cwd(), "public", "images", "dna", "example-reference.jpg");
    const referenceBuffer = await readFile(referencePath);
    const avatarBuffer = await fetchImageBuffer(normalizeAvatarUrl(profile.profileImageUrl));
    const qrBuffer = await QRCode.toBuffer(qrText, {
      type: "png",
      width: 1024,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    const prompt = buildPrompt();
    const referenceBase64 = referenceBuffer.toString("base64");
    const avatarBase64 = avatarBuffer.toString("base64");
    const qrBase64 = qrBuffer.toString("base64");

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        createPartFromBase64(referenceBase64, "image/jpeg"),
        createPartFromBase64(avatarBase64, "image/jpeg"),
        createPartFromBase64(qrBase64, "image/png"),
        prompt,
      ],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: "2:3",
        },
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find((part) => part.inlineData?.data);
    const imageData = imagePart?.inlineData?.data;
    if (!imageData) {
      throw new Error("No image generated by Gemini");
    }

    const outputDir = join(process.cwd(), "public", "generated", "dna");
    await mkdir(outputDir, { recursive: true });

    const fileName = `${cleanHandle}-${styleId || "dna"}-${Date.now()}-${randomUUID().slice(0, 8)}.png`;
    const filePath = join(outputDir, fileName);
    await writeFile(filePath, Buffer.from(imageData, "base64"));

    return NextResponse.json({
      success: true,
      imageUrl: `/generated/dna/${fileName}`,
      qrCodeDataUrl: await QRCode.toDataURL(qrText),
      profileImageUrl: normalizeAvatarUrl(profile.profileImageUrl),
      prompt,
      style: {
        id: style?.id ?? null,
        name: styleName,
        description: styleDescription,
      },
      model: "gemini-2.5-flash-image",
    });
  } catch (error) {
    console.error("[Banana image generation failed]", error);
    return NextResponse.json(
      {
        error: "Failed to generate banana artwork",
        details: sanitizeErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
