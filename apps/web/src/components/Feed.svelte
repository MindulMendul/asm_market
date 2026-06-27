<script>
  import { onMount } from "svelte";
  import { getPosts } from "../lib/mock";

  /** @type {import("../lib/mock").Post[]} */
  let posts = [];
  let loading = true;

  /** @type {"ALL" | "SELL" | "BUY"} */
  let filter = "ALL";

  const TABS = [
    { key: "ALL", label: "전체" },
    { key: "SELL", label: "팝니다" },
    { key: "BUY", label: "삽니다" },
  ];

  // 스켈레톤 카드 개수
  const SKELETON_COUNT = 6;
  const skeletons = Array.from({ length: SKELETON_COUNT });

  $: filteredPosts =
    filter === "ALL" ? posts : posts.filter((p) => p.tradeType === filter);

  onMount(async () => {
    loading = true;
    try {
      posts = await getPosts();
    } finally {
      loading = false;
    }
  });

  /** @param {import("../lib/mock").Post} post */
  function detailHref(post) {
    return post.isUser ? `/post?id=${post.id}` : `/items/${post.id}`;
  }

  /** @param {number} price */
  function formatPrice(price) {
    return price.toLocaleString("ko-KR") + "원";
  }

  /** @param {string} iso */
  function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return "방금 전";
    if (min < 60) return `${min}분 전`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}시간 전`;
    const day = Math.floor(hr / 24);
    return `${day}일 전`;
  }
</script>

<section class="feed">
  <header class="feed__header">
    <h1 class="feed__title">SOMA-MARKET</h1>
    <p class="feed__subtitle">우리 동네 중고거래</p>
  </header>

  <nav class="tabs">
    {#each TABS as tab}
      <button
        class="tab"
        class:tab--active={filter === tab.key}
        on:click={() => (filter = tab.key)}
      >
        {tab.label}
      </button>
    {/each}
  </nav>

  <ul class="list">
    {#if loading}
      {#each skeletons as _}
        <li class="card card--skeleton">
          <div class="thumb skeleton"></div>
          <div class="info">
            <div class="skeleton line line--title"></div>
            <div class="skeleton line line--sub"></div>
            <div class="skeleton line line--price"></div>
            <div class="skeleton line line--meta"></div>
          </div>
        </li>
      {/each}
    {:else if filteredPosts.length === 0}
      <li class="empty">
        {filter === "BUY" ? "삽니다 글이 없어요." : filter === "SELL" ? "팝니다 글이 없어요." : "아직 등록된 글이 없어요."}
      </li>
    {:else}
      {#each filteredPosts as post (post.id)}
        <li>
          <a class="card" href={detailHref(post)}>
            <img class="thumb" src={post.thumbnail} alt={post.title} loading="lazy" />
            <div class="info">
              <h2 class="card__title">{post.title}</h2>
              <p class="card__sub">{post.location} · {timeAgo(post.createdAt)}</p>
              <p class="card__price">
                <span class="badge badge--{post.tradeType === 'BUY' ? 'buy' : 'sell'}">
                  {post.tradeType === "BUY" ? "삽니다" : "팝니다"}
                </span>
                {formatPrice(post.price)}
              </p>
              <div class="card__meta">
                <span>♡ {post.likes}</span>
                <span>💬 {post.chats}</span>
              </div>
            </div>
          </a>
        </li>
      {/each}
    {/if}
  </ul>
</section>

<a class="fab" href="/write" aria-label="글쓰기">
  <span class="fab__plus">＋</span>
  <span class="fab__label">글쓰기</span>
</a>

<style>
  .feed {
    max-width: 720px;
    margin: 0 auto;
    padding: 1rem 1rem 4rem;
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    color: #212124;
  }

  .feed__header {
    padding: 1rem 0 1.25rem;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 0.5rem;
  }

  .feed__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #ff6f0f;
  }

  .feed__subtitle {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    color: #868b94;
  }

  .tabs {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem 0;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 5;
  }

  .tab {
    border: 1px solid #e4e6ea;
    background: #fff;
    color: #4d5159;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.4375rem 0.875rem;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .tab--active {
    background: #212124;
    border-color: #212124;
    color: #fff;
  }

  .list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .card {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #f4f4f4;
  }

  a.card {
    text-decoration: none;
    color: inherit;
    transition: opacity 0.15s ease;
  }

  a.card:active {
    opacity: 0.6;
  }

  @media (hover: hover) {
    a.card:hover {
      opacity: 0.85;
    }
  }

  .thumb {
    width: 104px;
    height: 104px;
    border-radius: 12px;
    object-fit: cover;
    background: #f0f0f0;
    flex-shrink: 0;
  }

  .info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .card__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card__sub {
    margin: 0.25rem 0 0;
    font-size: 0.8125rem;
    color: #868b94;
  }

  .card__price {
    margin: 0.375rem 0 0;
    font-size: 1.0625rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .badge {
    font-size: 0.6875rem;
    font-weight: 700;
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    line-height: 1.4;
  }

  .badge--sell {
    background: #ffe9d9;
    color: #ff6f0f;
  }

  .badge--buy {
    background: #e3f0ff;
    color: #1f6feb;
  }

  .card__meta {
    margin-top: auto;
    display: flex;
    gap: 0.75rem;
    font-size: 0.8125rem;
    color: #adb1ba;
  }

  .empty {
    list-style: none;
    text-align: center;
    color: #868b94;
    padding: 4rem 0;
  }

  .fab {
    position: fixed;
    right: max(1rem, calc(50% - 360px + 1rem));
    bottom: 1.5rem;
    z-index: 20;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.75rem 1.125rem;
    background: #ff6f0f;
    color: #fff;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.9375rem;
    box-shadow: 0 6px 16px rgba(255, 111, 15, 0.4);
    transition: transform 0.15s ease;
  }

  .fab:active {
    transform: scale(0.96);
  }

  .fab__plus {
    font-size: 1.125rem;
    line-height: 1;
  }

  /* 스켈레톤 */
  .skeleton {
    position: relative;
    overflow: hidden;
    background: #eceef0;
  }

  .skeleton::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
    );
    animation: shimmer 1.4s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  .line {
    height: 12px;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }

  .line--title {
    width: 85%;
  }

  .line--sub {
    width: 55%;
  }

  .line--price {
    width: 40%;
    height: 16px;
    margin-top: 0.25rem;
  }

  .line--meta {
    width: 30%;
    margin-top: auto;
    margin-bottom: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton::after {
      animation: none;
    }
  }
</style>
