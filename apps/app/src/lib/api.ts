// apps/app/src/lib/api.ts
import { hc } from "hono/client";
import type { AppType } from "@soma-market/api-client";

export const apiClient = hc<AppType>({
  baseURL: process.env.API_BASE_URL ?? "http://localhost:3000",
});
