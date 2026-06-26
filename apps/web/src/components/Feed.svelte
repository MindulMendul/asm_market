<!-- apps/web/src/components/Feed.svelte -->
<script lang="ts">
  export type Item = {
    id: number;
    title: string;
    price: string;
    description: string;
    images: string[];
    status: "FOR_SALE" | "RESERVED" | "SOLD";
    seller_id: string;
    created_at: string;
  };

  export let items: Item[] = [];
</script>

<section class="feed">
  <h1>SOMA-MARKET Feed</h1>

  {#if items.length === 0}
    <p>등록된 매물이 없습니다.</p>
  {:else}
    <ul>
      {#each items as item}
        <li class="item-card">
          <div class="item-header">
            <strong>{item.title}</strong>
            <span class="status">{item.status.replace("_", " ")}</span>
          </div>
          <p class="price">₩{item.price}</p>
          <p>{item.description}</p>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  .feed {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }

  .item-card {
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    padding: 1.25rem;
    margin-bottom: 1rem;
    background: #ffffff;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .status {
    font-size: 0.85rem;
    color: #6b7280;
  }

  .price {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
</style>
