// apps/api/server.ts
import { Hono } from "hono";
import cron from "node-cron";
import { supabase, db } from "../../packages/db";

const app = new Hono();

app.get("/api/health", (ctx) => ctx.json({ status: "ok" }));

app.get("/api/items", async (ctx) => {
  const { data, error } = await supabase.from("items").select("*").order("created_at", { ascending: false });

  if (error) {
    return ctx.json({ error: error.message }, 500);
  }

  return ctx.json(data ?? []);
});

app.post("/api/items", async (ctx) => {
  const body = await ctx.req.json();

  const payload = {
    title: body.title,
    price: body.price,
    description: body.description,
    images: body.images ?? [],
    status: body.status ?? "FOR_SALE",
    seller_id: body.seller_id,
  };

  const { data, error } = await supabase.from("items").insert(payload).select();

  if (error) {
    return ctx.json({ error: error.message }, 500);
  }

  return ctx.json(data?.[0] ?? null, 201);
});

cron.schedule("0 4 * * *", async () => {
  try {
    await db.execute("SELECT 1;");
    console.log("[keep-alive] SELECT 1 executed at 04:00");
  } catch (error) {
    console.error("[keep-alive] failed to execute heartbeat", error);
  }
});

export type AppType = typeof app;
export default app;
