// apps/web/src/lib/site.ts
// 사이트 공통 메타데이터. 실제 배포 도메인이 정해지면 url을 바꿔주세요.

export const SITE = {
  name: "SOMA-MARKET",
  /** 절대 URL(OG/canonical)에 사용. astro.config.mjs의 site와 맞춰주세요. */
  url: "https://soma-market.example.com",
  title: "SOMA-MARKET · 우리 동네 중고거래",
  description: "가까운 이웃과 함께하는 중고거래 마켓, SOMA-MARKET. 믿을 수 있는 직거래를 시작해보세요.",
  /** 기본 OG 이미지(없으면 picsum 임시). 1200x630 권장 */
  ogImage: "https://picsum.photos/seed/soma-market/1200/630",
  locale: "ko_KR",
  twitter: "@soma_market",
};
