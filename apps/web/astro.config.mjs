import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

export default defineConfig({
  // 실제 배포 도메인으로 변경하세요. OG/canonical 절대 URL 생성에 사용됩니다.
  site: "https://soma-market.example.com",
  integrations: [svelte()],
  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
});
