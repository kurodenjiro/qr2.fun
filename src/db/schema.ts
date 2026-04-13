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
