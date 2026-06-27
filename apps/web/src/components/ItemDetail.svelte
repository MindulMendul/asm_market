<script>
  import Chat from "./Chat.svelte";

  /** @type {import("../lib/mock").Post} */
  export let post;

  let chatOpen = false;

  /** @param {number} price */
  function formatPrice(price) {
    return price.toLocaleString("ko-KR") + "원";
  }

  function toggleChat() {
    chatOpen = !chatOpen;
  }
</script>

<article class="detail">
  <img class="hero" src={post.thumbnail} alt={post.title} />

  <div class="seller">
    <span class="seller__avatar">{post.seller.slice(0, 1)}</span>
    <div>
      <p class="seller__name">{post.seller}</p>
      <p class="seller__loc">{post.location}</p>
    </div>
  </div>

  <div class="content">
    <span class="badge badge--{post.tradeType === 'BUY' ? 'buy' : 'sell'}">
      {post.tradeType === "BUY" ? "삽니다" : "팝니다"}
    </span>
    <h1 class="title">{post.title}</h1>
    <p class="price">{formatPrice(post.price)}</p>
    <p class="desc">{post.description}</p>
    <div class="stats">
      <span>관심 {post.likes}</span>
      <span>·</span>
      <span>채팅 {post.chats}</span>
    </div>
  </div>

  {#if chatOpen}
    <div class="chat-wrap">
      <Chat postId={post.id} seller={post.seller} />
    </div>
  {/if}
</article>

<div class="bottom-bar">
  <div class="bottom-bar__price">
    <span class="bottom-bar__amount">{formatPrice(post.price)}</span>
  </div>
  <button class="chat-btn" on:click={toggleChat}>
    {chatOpen ? "채팅 닫기" : "채팅하기"}
  </button>
</div>

<style>
  .detail {
    max-width: 720px;
    margin: 0 auto;
    padding-bottom: 96px;
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    color: #212124;
  }

  .hero {
    width: 100%;
    aspect-ratio: 1 / 1;
    max-height: 480px;
    object-fit: cover;
    background: #f0f0f0;
    display: block;
  }

  .seller {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-bottom: 1px solid #f4f4f4;
  }

  .seller__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ffe9d9;
    color: #ff6f0f;
    font-weight: 700;
    display: grid;
    place-items: center;
  }

  .seller__name {
    margin: 0;
    font-weight: 600;
  }

  .seller__loc {
    margin: 0.125rem 0 0;
    font-size: 0.8125rem;
    color: #868b94;
  }

  .content {
    padding: 1.25rem 1rem;
  }

  .badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.1875rem 0.5rem;
    border-radius: 5px;
    margin-bottom: 0.625rem;
  }

  .badge--sell {
    background: #ffe9d9;
    color: #ff6f0f;
  }

  .badge--buy {
    background: #e3f0ff;
    color: #1f6feb;
  }

  .title {
    margin: 0;
    font-size: 1.375rem;
    font-weight: 700;
    line-height: 1.35;
  }

  .price {
    margin: 0.75rem 0 1.25rem;
    font-size: 1.25rem;
    font-weight: 800;
  }

  .desc {
    margin: 0;
    font-size: 1rem;
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .stats {
    margin-top: 1.5rem;
    display: flex;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: #adb1ba;
  }

  .chat-wrap {
    padding: 0 1rem 1rem;
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 720px;
    margin: 0 auto;
    padding: 0.75rem 1rem;
    background: #fff;
    border-top: 1px solid #eceef0;
  }

  .bottom-bar__amount {
    font-size: 1.0625rem;
    font-weight: 700;
  }

  .chat-btn {
    margin-left: auto;
    border: none;
    background: #ff6f0f;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  .chat-btn:active {
    opacity: 0.7;
  }
</style>
