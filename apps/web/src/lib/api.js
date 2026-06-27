// apps/web/src/lib/api.js
import { hc } from "hono/client";

/**
 * Lightweight RPC client for the SOMA-MARKET API.
 * @type {ReturnType<typeof hc>}
 */
export const apiClient = hc({ baseURL: "/" });
