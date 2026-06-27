<script>
  import { onMount, tick } from "svelte";
  import { getMessages, sendMessage } from "../lib/mock";

  /** @type {number} */
  export let postId;
  /** @type {string} */
  export let seller = "판매자";

  /** @type {import("../lib/mock").ChatMessage[]} */
  let messages = [];
  let loading = true;
  let sending = false;
  let draft = "";
  /** @type {HTMLElement} */
  let scrollEl;

  onMount(async () => {
    messages = await getMessages(postId);
    loading = false;
    await scrollToBottom();
  });

  async function scrollToBottom() {
    await tick();
    if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
  }

  async function handleSend() {
    const text = draft.trim();
    if (!text || sending) return;

    messages = [
      ...messages,
      {
        id: Date.now(),
        from: "me",
        text,
        createdAt: new Date().toISOString(),
      },
    ];
    draft = "";
    sending = true;
    await scrollToBottom();

    // MOCK: 판매자 자동 응답
    const reply = await sendMessage(postId, text);
    messages = [...messages, reply];
    sending = false;
    await scrollToBottom();
  }

  /** @param {KeyboardEvent} e */
  function handleKeydown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  /** @param {string} iso */
  function formatTime(iso) {
    return new Date(iso).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
</script>

<div class="chat">
  <div class="chat__header">
    <span class="chat__avatar">{seller.slice(0, 1)}</span>
    <div>
      <p class="chat__name">{seller}</p>
      <p class="chat__status">보통 1시간 내 응답</p>
    </div>
  </div>

  <div class="chat__body" bind:this={scrollEl}>
    {#if loading}
      <p class="chat__loading">대화를 불러오는 중…</p>
    {:else}
      {#each messages as msg (msg.id)}
        <div class="msg msg--{msg.from}">
          <div class="bubble">{msg.text}</div>
          <span class="time">{formatTime(msg.createdAt)}</span>
        </div>
      {/each}
      {#if sending}
        <div class="msg msg--seller">
          <div class="bubble bubble--typing">
            <span></span><span></span><span></span>
          </div>
        </div>
      {/if}
    {/if}
  </div>

  <div class="chat__input">
    <textarea
      rows="1"
      bind:value={draft}
      on:keydown={handleKeydown}
      placeholder="메시지를 입력하세요"
      disabled={loading}
    ></textarea>
    <button on:click={handleSend} disabled={loading || sending || !draft.trim()}>
      전송
    </button>
  </div>
</div>

<style>
  .chat {
    display: flex;
    flex-direction: column;
    height: 480px;
    max-height: 70vh;
    border: 1px solid #eceef0;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
  }

  .chat__header {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.875rem 1rem;
    border-bottom: 1px solid #f4f4f4;
  }

  .chat__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #ffe9d9;
    color: #ff6f0f;
    font-weight: 700;
    display: grid;
    place-items: center;
  }

  .chat__name {
    margin: 0;
    font-size: 0.9375rem;
    font-weight: 600;
  }

  .chat__status {
    margin: 0;
    font-size: 0.75rem;
    color: #adb1ba;
  }

  .chat__body {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: #fafafa;
  }

  .chat__loading {
    margin: auto;
    color: #adb1ba;
    font-size: 0.875rem;
  }

  .msg {
    display: flex;
    flex-direction: column;
    max-width: 75%;
  }

  .msg--me {
    align-self: flex-end;
    align-items: flex-end;
  }

  .msg--seller {
    align-self: flex-start;
    align-items: flex-start;
  }

  .bubble {
    padding: 0.5rem 0.75rem;
    border-radius: 14px;
    font-size: 0.9375rem;
    line-height: 1.4;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .msg--me .bubble {
    background: #ff6f0f;
    color: #fff;
    border-bottom-right-radius: 4px;
  }

  .msg--seller .bubble {
    background: #fff;
    border: 1px solid #eceef0;
    color: #212124;
    border-bottom-left-radius: 4px;
  }

  .time {
    font-size: 0.6875rem;
    color: #c0c4cc;
    margin-top: 0.125rem;
  }

  .bubble--typing {
    display: flex;
    gap: 4px;
  }

  .bubble--typing span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #c0c4cc;
    animation: blink 1.2s infinite;
  }

  .bubble--typing span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .bubble--typing span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0%,
    60%,
    100% {
      opacity: 0.3;
    }
    30% {
      opacity: 1;
    }
  }

  .chat__input {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem;
    border-top: 1px solid #f4f4f4;
    background: #fff;
  }

  textarea {
    flex: 1;
    resize: none;
    border: 1px solid #e4e6ea;
    border-radius: 12px;
    padding: 0.625rem 0.75rem;
    font-size: 0.9375rem;
    font-family: inherit;
    outline: none;
    max-height: 100px;
  }

  textarea:focus {
    border-color: #ff6f0f;
  }

  button {
    border: none;
    background: #ff6f0f;
    color: #fff;
    font-weight: 600;
    padding: 0 1.125rem;
    border-radius: 12px;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  button:disabled {
    background: #d9dce1;
    cursor: not-allowed;
  }
</style>
