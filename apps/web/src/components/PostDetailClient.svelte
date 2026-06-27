<script>
  import { onMount } from "svelte";
  import { getPost } from "../lib/mock";
  import ItemDetail from "./ItemDetail.svelte";

  /** @type {import("../lib/mock").Post | null} */
  let post = null;
  let loading = true;

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    if (id) {
      post = await getPost(id, 0);
    }
    loading = false;
  });
</script>

{#if loading}
  <p class="state">불러오는 중…</p>
{:else if post}
  <ItemDetail {post} />
{:else}
  <div class="state">
    <p>존재하지 않거나 삭제된 글입니다.</p>
    <a href="/">목록으로 돌아가기</a>
  </div>
{/if}

<style>
  .state {
    max-width: 720px;
    margin: 0 auto;
    padding: 4rem 1rem;
    text-align: center;
    color: #868b94;
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  }

  .state a {
    color: #ff6f0f;
    font-weight: 600;
  }
</style>
