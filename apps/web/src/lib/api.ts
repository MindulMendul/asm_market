// apps/web/src/lib/api.ts
import { hc } from "hono/client";

export const apiClient = hc({ baseURL: "/" });
