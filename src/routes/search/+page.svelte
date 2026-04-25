<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import BottomNav from '$lib/components/BottomNav.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { products, searchSuggestions } from '$lib/data/products';
  import type { PageData } from './$types';

  export let data: PageData;

  $: query = browser ? ($page.url.searchParams.get('q')?.trim() ?? '') : '';
  $: results = data.results?.length > 0 ? data.results : products;
</script>

<svelte:head>
  <title>Search | Ethereal</title>
</svelte:head>

<main class="px-4 pb-32 pt-4">
  <section class="phone-shell px-4 pb-28 pt-4">
    <div class="topbar">
      <a aria-label="Back to home" class="topbar-action" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </a>
      <p class="text-[0.85rem] font-extrabold uppercase tracking-[0.08em] text-black">Search</p>
      <div class="topbar-action text-sm"> </div>
    </div>

    <form action="/search" class="mt-7 flex items-center gap-3 rounded-full border border-black/5 bg-white px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]" method="GET">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-black/50 overflow-visible"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input
        aria-label="Search products"
        autocomplete="off"
        class="w-full bg-transparent text-[0.85rem] font-medium placeholder:text-black/40 focus:outline-none"
        name="q"
        placeholder="Search anything..."
        spellcheck="false"
        type="search"
        value={query}
      />
      <button aria-label="Voice search" class="text-black/60" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
      </button>
    </form>

    <section class="mt-8">
      <p class="text-[0.7rem] font-extrabold uppercase tracking-[0.05em] text-black/80">Popular Searches</p>
      <div class="mt-3 flex flex-wrap gap-2">
        {#each searchSuggestions as suggestion}
          <a class="pill-chip" href={`/search?q=${encodeURIComponent(suggestion)}`}>{suggestion}</a>
        {/each}
      </div>
    </section>

    <section class="mt-8">
      <div class="flex items-center justify-between">
        <p class="text-[0.7rem] font-extrabold uppercase tracking-[0.05em] text-black/80">Results</p>
        <button class="flex items-center gap-1.5 text-[0.72rem] font-semibold text-black/60">
          Filter
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
        </button>
      </div>

      {#if results.length}
        <div class="mt-3 grid grid-cols-2 gap-3">
          {#each results as product}
            <ProductCard {product} />
          {/each}
        </div>
      {:else}
        <div class="ethereal-surface mt-3 rounded-[1.6rem] p-5 text-sm leading-6 text-black/62">
          No products match “{query}”. Try a broader term like streetwear or minimal.
        </div>
      {/if}
    </section>
  </section>

  <BottomNav current="search" />
</main>
