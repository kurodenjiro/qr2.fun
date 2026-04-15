import { sql } from "drizzle-orm";
import { db } from "@/db";
import { artStyles } from "@/db/schema";

const DEFAULT_ART_STYLES = [
  {
    id: "cyber_kinetic",
    name: "CYBER_KINETIC",
    description: "High-frequency energy pulse",
    imageUrl: "/images/dna/cyber-kinetic.svg",
  },
  {
    id: "mono_stasis",
    name: "MONO_STASIS",
    description: "Low-profile digital silence",
    imageUrl: "/images/dna/mono-stasis.svg",
  },
  {
    id: "void_signal",
    name: "VOID_SIGNAL",
    description: "Deep-space residual waveform",
    imageUrl: "/images/dna/void-signal.svg",
  },
] as const;

export async function ensureArtStylesTable() {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS art_styles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
    )
  `);

  await db.insert(artStyles).values(
    DEFAULT_ART_STYLES.map((style) => ({
      ...style,
      createdAt: new Date(),
    })),
  ).onConflictDoNothing();
}
