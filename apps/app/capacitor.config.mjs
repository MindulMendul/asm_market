// apps/app/capacitor.config.mjs
import { defineConfig } from "@capacitor/cli";

export default defineConfig({
  appId: "com.soma.market",
  appName: "SOMA-MARKET",
  webDir: "../web/dist",
  bundledWebRuntime: false,
});
