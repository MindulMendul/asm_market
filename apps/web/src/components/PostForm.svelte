<script>
  import { addUserPost } from "../lib/mock";

  /** @type {"SELL" | "BUY"} */
  let tradeType = "SELL";
  let title = "";
  let price = "";
  let location = "";
  let description = "";
  let thumbnail = "";
  let submitting = false;

  $: priceNumber = Number(String(price).replace(/[^0-9]/g, "")) || 0;
  $: valid = title.trim() && location.trim() && description.trim();

  function handleSubmit() {
    if (!valid || submitting) return;
    submitting = true;

    addUserPost({
      title: title.trim(),
      tradeType,
      price: priceNumber,
      location: location.trim(),
      description: description.trim(),
      thumbnail: thumbnail.trim() || undefined,
    });

    // 작성 후 목록으로 이동
    window.location.href = "/";
  }
</script>

<form class="form" on:submit|preventDefault={handleSubmit}>
  <div class="trade-toggle">
    <button
      type="button"
      class="trade-toggle__btn"
      class:active={tradeType === "SELL"}
      on:click={() => (tradeType = "SELL")}
    >
      팝니다
    </button>
    <button
      type="button"
      class="trade-toggle__btn"
      class:active={tradeType === "BUY"}
      on:click={() => (tradeType = "BUY")}
    >
      삽니다
    </button>
  </div>

  <label class="field">
    <span class="field__label">제목</span>
    <input type="text" bind:value={title} placeholder="예: 아이폰 15 Pro 256GB 팝니다" maxlength="100" />
  </label>

  <label class="field">
    <span class="field__label">{tradeType === "BUY" ? "예산" : "가격"}</span>
    <input type="text" inputmode="numeric" bind:value={price} placeholder="숫자만 입력" />
    {#if priceNumber > 0}
      <span class="field__hint">{priceNumber.toLocaleString("ko-KR")}원</span>
    {/if}
  </label>

  <label class="field">
    <span class="field__label">거래 지역</span>
    <input type="text" bind:value={location} placeholder="예: 서울 강남구 역삼동" maxlength="60" />
  </label>

  <label class="field">
    <span class="field__label">이미지 URL <span class="optional">(선택)</span></span>
    <input type="url" bind:value={thumbnail} placeholder="비워두면 임시 이미지가 들어갑니다" />
  </label>

  <label class="field">
    <span class="field__label">설명</span>
    <textarea bind:value={description} rows="6" placeholder="상품 상태, 거래 방식 등을 적어주세요."></textarea>
  </label>

  <button class="submit" type="submit" disabled={!valid || submitting}>
    {submitting ? "등록 중…" : "작성 완료"}
  </button>
</form>

<style>
  .form {
    max-width: 720px;
    margin: 0 auto;
    padding: 1rem 1rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    color: #212124;
  }

  .trade-toggle {
    display: flex;
    gap: 0.5rem;
  }

  .trade-toggle__btn {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #e4e6ea;
    background: #fff;
    border-radius: 12px;
    font-size: 0.9375rem;
    font-weight: 700;
    color: #868b94;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .trade-toggle__btn.active {
    border-color: #ff6f0f;
    background: #fff6f0;
    color: #ff6f0f;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .field__label {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .optional {
    font-weight: 400;
    color: #adb1ba;
  }

  .field__hint {
    font-size: 0.8125rem;
    color: #ff6f0f;
    font-weight: 600;
  }

  input,
  textarea {
    border: 1px solid #e4e6ea;
    border-radius: 12px;
    padding: 0.75rem;
    font-size: 0.9375rem;
    font-family: inherit;
    outline: none;
    width: 100%;
  }

  textarea {
    resize: vertical;
    line-height: 1.5;
  }

  input:focus,
  textarea:focus {
    border-color: #ff6f0f;
  }

  .submit {
    margin-top: 0.5rem;
    border: none;
    background: #ff6f0f;
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.875rem;
    border-radius: 12px;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  .submit:disabled {
    background: #d9dce1;
    cursor: not-allowed;
  }
</style>
