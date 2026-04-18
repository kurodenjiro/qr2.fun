import { pgTable, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const dashboards = pgTable("dashboards", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ownerId: text("owner_id").notNull(),
  isShared: boolean("is_shared").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const widgets = pgTable("widgets", {
  id: text("id").primaryKey(),
  dashboardId: text("dashboard_id").notNull().references(() => dashboards.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  layoutConfig: text("layout_config").notNull(), // JSON string representing: { x, y, w, h }
});

export const designs = pgTable("designs", {
  id: text("id").primaryKey(),
  handle: text("handle").notNull(),
  type: text("type").notNull(), // 't-shirt' | 'hoodie'
  styleId: text("style_id").notNull(),
  dnaData: text("dna_data").notNull(), // JSON string of DNA traits
  qrUrl: text("qr_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const artStyles = pgTable("art_styles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const twitterTweetEmbeddings = pgTable("twitter_tweet_embeddings", {
  id: text("id").primaryKey(),
  handle: text("handle").notNull(),
  topic: text("topic"),
  tweetText: text("tweet_text").notNull(),
  isReply: boolean("is_reply").notNull().default(false),
  likes: integer("likes").notNull().default(0),
  retweets: integer("retweets").notNull().default(0),
  replies: integer("replies").notNull().default(0),
  tweetTimestamp: text("tweet_timestamp"),
  embedding: text("embedding").notNull(),
  model: text("model").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const twitterStyleAnalyses = pgTable("twitter_style_analyses", {
  id: text("id").primaryKey(),
  handle: text("handle").notNull(),
  topic: text("topic"),
  profileImageUrl: text("profile_image_url"),
  analysisJson: text("analysis_json").notNull(),
  profileEmbedding: text("profile_embedding").notNull(),
  sourceTweets: text("source_tweets").notNull(),
  model: text("model").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const twitterProfiles = pgTable("twitter_profiles", {
  handle: text("handle").primaryKey(),
  username: text("username"),
  displayName: text("display_name"),
  profileImageUrl: text("profile_image_url"),
  profileBannerUrl: text("profile_banner_url"),
  profileBio: text("profile_bio"),
  profileWebsite: text("profile_website"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
