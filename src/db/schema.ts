import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const dashboards = sqliteTable("dashboards", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ownerId: text("owner_id").notNull(),
  isShared: integer("is_shared", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const widgets = sqliteTable("widgets", {
  id: text("id").primaryKey(),
  dashboardId: text("dashboard_id").notNull().references(() => dashboards.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  layoutConfig: text("layout_config").notNull(), // JSON string representing: { x, y, w, h }
});

export const designs = sqliteTable("designs", {
  id: text("id").primaryKey(),
  handle: text("handle").notNull(),
  type: text("type").notNull(), // 't-shirt' | 'hoodie'
  styleId: text("style_id").notNull(),
  dnaData: text("dna_data").notNull(), // JSON string of DNA traits
  qrUrl: text("qr_url").notNull(),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const artStyles = sqliteTable("art_styles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`),
});
