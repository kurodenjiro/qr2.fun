import { sql } from "drizzle-orm";
import { db } from "@/db";
import { artStyles } from "@/db/schema";

const DEFAULT_ART_STYLES = [
  {
    id: "cyber_kinetic",
    name: "CYBER_KINETIC",
    description: "High-frequency energy pulse",
    imageUrl: "/images/dna/example-reference.jpg",
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

export async function ensureAppTables() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS dashboards (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      owner_id TEXT NOT NULL,
      is_shared BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS widgets (
      id TEXT PRIMARY KEY,
      dashboard_id TEXT NOT NULL REFERENCES dashboards(id) ON DELETE CASCADE,
      type TEXT NOT NULL,
      layout_config TEXT NOT NULL
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS designs (
      id TEXT PRIMARY KEY,
      handle TEXT NOT NULL,
      type TEXT NOT NULL,
      style_id TEXT NOT NULL,
      dna_data TEXT NOT NULL,
      qr_url TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
}

export async function ensureArtStylesTable() {
  await ensureAppTables();
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS art_styles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);

  await db.insert(artStyles).values(
    DEFAULT_ART_STYLES.map((style) => ({
      ...style,
      createdAt: new Date(),
    })),
  ).onConflictDoUpdate({
    target: artStyles.id,
    set: {
      name: sql`excluded.name`,
      description: sql`excluded.description`,
      imageUrl: sql`excluded.image_url`,
    },
  });
}

export async function ensureTwitterVectorTables() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS twitter_tweet_embeddings (
      id TEXT PRIMARY KEY,
      handle TEXT NOT NULL,
      topic TEXT,
      tweet_text TEXT NOT NULL,
      is_reply BOOLEAN NOT NULL DEFAULT FALSE,
      likes INTEGER NOT NULL DEFAULT 0,
      retweets INTEGER NOT NULL DEFAULT 0,
      replies INTEGER NOT NULL DEFAULT 0,
      tweet_timestamp TEXT,
      embedding TEXT NOT NULL,
      model TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS twitter_style_analyses (
      id TEXT PRIMARY KEY,
      handle TEXT NOT NULL,
      topic TEXT,
      profile_image_url TEXT,
      analysis_json TEXT NOT NULL,
      profile_embedding TEXT NOT NULL,
      source_tweets TEXT NOT NULL,
      model TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS twitter_profiles (
      handle TEXT PRIMARY KEY,
      username TEXT,
      display_name TEXT,
      profile_image_url TEXT,
      profile_banner_url TEXT,
      profile_bio TEXT,
      profile_website TEXT,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
}
