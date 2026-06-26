// apps/web/src/lib/api.ts
import { hc } from "@hono/rpc/client";
import type { AppType } from "@soma-market/api-client";

export const apiClient = hc<AppType>({ baseURL: "/" });
