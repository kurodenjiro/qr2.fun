import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/db";
import { artStyles } from "@/db/schema";
import { ensureArtStylesTable } from "@/db/bootstrap";

export async function GET(request: Request) {
  try {
    await ensureArtStylesTable();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const [style] = await db.select().from(artStyles).where(eq(artStyles.id, id)).limit(1);
      if (!style) {
        return NextResponse.json({ error: "Style not found" }, { status: 404 });
      }
      return NextResponse.json({ style });
    }

    const styles = await db.select().from(artStyles).orderBy(desc(artStyles.createdAt));
    return NextResponse.json({ styles });
  } catch (error) {
    console.error("Failed to fetch art styles:", error);
    return NextResponse.json({ error: "Failed to fetch art styles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureArtStylesTable();
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const description = String(body?.description ?? "").trim();
    const imageUrl = String(body?.imageUrl ?? "").trim();

    if (!name || !description || !imageUrl) {
      return NextResponse.json({ error: "name, description, and imageUrl are required" }, { status: 400 });
    }

    const newStyle = {
      id: uuidv4(),
      name,
      description,
      imageUrl,
      createdAt: new Date(),
    };

    await db.insert(artStyles).values(newStyle);

    return NextResponse.json({ success: true, style: newStyle }, { status: 201 });
  } catch (error) {
    console.error("Failed to create art style:", error);
    return NextResponse.json({ error: "Failed to create art style" }, { status: 500 });
  }
}
