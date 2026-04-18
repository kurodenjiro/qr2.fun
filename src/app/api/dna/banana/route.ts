import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { generateText } from "ai";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { ensureTwitterVectorTables } from "@/db/bootstrap";
import { artStyles, twitterProfiles } from "@/db/schema";

export const maxDuration = 90;

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
  return handle.replace(/^@/, "").trim().toLowerCase();
}

function normalizeAvatarUrl(url: string) {
  return url.replace(/_normal(\.(?:jpg|jpeg|png|webp))$/i, "$1");
}

function sanitizeErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err ?? "unknown_error");
  return raw.replace(/\s+/g, " ").slice(0, 220);
}

function buildPrompt() {
  return [
    `A striking, minimalist high-contrast monochrome ink wash illustration, rendered in the specific artistic style of example-reference.jpg, depicting the portrait of the subject in Image 2.`,
    `The focus is on the dramatic, high-contrast ink application and the exceptionally glossy, lacquer-like finish on the hair with dramatic reflections.`,
    `The background is pure white.`,
    `Use exactly one QR code, sourced from Image 3, and place it only once in the center of the torso (chest area) as part of the clothing.`,
    `Do not create any second QR code, duplicate code fragment, sticker, patch, label, poster, or floating square anywhere else in the composition.`,
    `Do not place any QR code element on the face, hair, neck, shoulders, background, or outside the garment area.`,
    `The composition of the subject's clothing is central: the single QR code is integrated as a non-distinct garment element in the chest area.`,
    `Crucially, this QR code does not have hard, defined geometric borders.`,
    `Its peripheral squares dissolve, fracture, and bleed seamlessly into the surrounding integrated minimalist abstract ink wash patterns and splatters.`,
    `These surrounding ink elements appear to grow out of and merge with the QR code modules, creating a single, unified textured garment that flows dynamically around the three-dimensional curves of the body.`,
    `Avoid collage behavior, taped-paper overlays, print mockup stickers, or duplicated reference elements.`,
    `The sparse facial features of the subject remain minimally integrated at the neck with the surrounding patterns.`,
    `All lines are defined and confident.`,
    `Generate exactly one final image and keep any text response minimal.`,
    ``,
    `Input images: 1) Reference art style, 2) Avatar portrait, 3) QR code`,
    `Create a 2:3 portrait composition suitable for apparel print.`,
  ].join("\n");
}

function getGeneratedImageFile(result: {
  files?: Array<{ mediaType?: string; uint8Array?: Uint8Array; base64?: string }>;
}) {
  return result.files?.find((file) => file.mediaType?.startsWith("image/"));
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BananaRequest;
    const cleanHandle = normalizeHandle(body.handle ?? "");
    const styleId = body.styleId?.trim() || "";
    const qrText = body.qrText?.trim() || `https://qr2.fun/a/${cleanHandle || "anonymous"}`;

    if (!cleanHandle) {
      return NextResponse.json({ error: "Handle required" }, { status: 400 });
    }

    await ensureTwitterVectorTables();

    const [profile] = (await db
      .select()
      .from(twitterProfiles)
      .where(eq(twitterProfiles.handle, cleanHandle))
      .limit(1)) as TwitterProfileRow[];

    if (!profile?.profileImageUrl) {
      return NextResponse.json({ error: "Twitter profile image not available. Sync the handle first." }, { status: 404 });
    }

    const [style] = styleId
      ? await db.select().from(artStyles).where(eq(artStyles.id, styleId)).limit(1)
      : [null];

    const styleName = style?.name ?? "DNA_STYLE";
    const styleDescription = style?.description ?? "Monochrome organic pattern";

    const referenceUrl = new URL("https://qr2.fun/images/dna/example-reference.jpg");
    const avatarUrl = new URL(normalizeAvatarUrl(profile.profileImageUrl));
    const qrBuffer = await QRCode.toBuffer(qrText, {
      type: "png",
      width: 1024,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    const prompt = `A striking, minimalist high-contrast monochrome ink wash illustration, rendered in the specific artistic style of Image 1, depicting the portrait of Image 2. The focus is on the dramatic, high-contrast ink application and the exceptionally glossy, lacquer-like finish on the hair with dramatic reflections. The background is pure white. The composition of the subject's clothing is central: A complex, dense QR code pattern, sourced directly from Image 3, is integrated as a non-distinct, integrated element in the center of the torso (chest area). Crucially, this QR code does not have hard, defined geometric borders. Its peripheral squares dissolve, fracture, and bleed seamlessly into the surrounding integrated minimalist abstract ink wash patterns and splatters. These surrounding ink elements appear to grow out of and merge with the QR code modules, creating a single, unified textured garment that flows dynamically around the three-dimensional curves of the body. The sparse facial features of Image 2 remain minimally integrated at the neck with the surrounding patterns. All lines are defined and confident.`;
    const result = await generateText({
      model: "google/gemini-3.1-flash-image-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image", image: referenceUrl },
            { type: "image", image: avatarUrl },
            { type: "image", image: qrBuffer },
          ],
        },
      ],
    });
    const imageFile = getGeneratedImageFile(result);

    if (!imageFile?.uint8Array?.length) {
      throw new Error("No image file returned by AI Gateway response");
    }

    const outputDir = join(process.cwd(), "public", "generated", "dna");
    await mkdir(outputDir, { recursive: true });

    const extension = imageFile.mediaType?.split("/")[1] || "png";
    const fileName = `${cleanHandle}-${styleId || "dna"}-${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`;
    const filePath = join(outputDir, fileName);
    await writeFile(filePath, imageFile.uint8Array);

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
      model: "google/gemini-3.1-flash-image-preview",
      responseText: result.text || null,
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
