import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pastes = sqliteTable("pastes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  mode: text("mode").notNull().default("plaintext"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Paste = typeof pastes.$inferSelect;
export type NewPaste = typeof pastes.$inferInsert;
