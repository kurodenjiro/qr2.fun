import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { designs } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { handle, type, styleId, dnaData, qrUrl } = body;

    // Handle can be optional, defaults to 'anonymous'
    const finalHandle = handle || "anonymous";

    if (!type || !styleId || !dnaData || !qrUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newDesign = {
      id: uuidv4(),
      handle: finalHandle,
      type,
      styleId,
      dnaData: JSON.stringify(dnaData),
      qrUrl,
      createdAt: new Date(),
    };

    await db.insert(designs).values(newDesign);
    revalidatePath("/collections");
    revalidatePath(`/product/${newDesign.id}`);

    return NextResponse.json({ success: true, id: newDesign.id });
  } catch (error) {
    console.error("Failed to save design:", error);
    return NextResponse.json({ error: "Failed to save design" }, { status: 500 });
  }
}
