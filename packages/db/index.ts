// packages/db/index.ts
import { createClient } from "@supabase/supabase-js";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { items, itemStatus, type ItemInsert } from "./schema";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const DATABASE_URL = process.env.DATABASE_URL ?? "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
  },
});

export const pg = postgres(DATABASE_URL, {
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pg);

export { items, itemStatus };
export type { ItemInsert };
