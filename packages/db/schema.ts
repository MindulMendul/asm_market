// packages/db/schema.ts
import { pgEnum, pgTable, serial, text, varchar, numeric, timestamp, textArray } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const itemStatus = pgEnum("item_status", ["FOR_SALE", "RESERVED", "SOLD"]);

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  description: text("description").notNull(),
  images: textArray("images").notNull().$type<string[]>(),
  status: itemStatus("status").notNull().default("FOR_SALE"),
  sellerId: varchar("seller_id", { length: 128 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Item = InferModel<typeof items>;
export type ItemInsert = InferModel<typeof items, "insert">;
