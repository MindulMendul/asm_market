<script>
  /**
   * Minimal Feed component
   * @type {{ title?: string }[]}
   */
  export let items = [];
</script>

<section style="font-family: system-ui, sans-serif; max-width:900px; margin:0 auto; padding:1rem;">
  <h1>SOMA-MARKET Feed</h1>
  {#if items.length === 0}
    <p>No items yet.</p>
  {:else}
    <ul>
      {#each items as item}
        <li>{item.title ?? 'Untitled'}</li>
      {/each}
    </ul>
  {/if}
</section>
