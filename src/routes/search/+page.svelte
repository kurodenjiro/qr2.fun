<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import BottomNav from '$lib/components/BottomNav.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { products, searchSuggestions } from '$lib/data/products';

  function matchesQuery(query: string, value: string) {
    return value.toLowerCase().includes(query);
  }

  $: query = browser ? ($page.url.searchParams.get('q')?.trim() ?? '') : '';
  $: normalizedQuery = query.toLowerCase();
  $: results = normalizedQuery
    ? products.filter((product) =>
        [product.name, product.category, product.description, product.shortDescription, ...product.tags].some(
          (value) => matchesQuery(normalizedQuery, value)
        )
      )
    : products;
</script>

<svelte:head>
  <title>Search | Ethereal</title>
</svelte:head>

<main class="px-4 pb-32 pt-4">
  <section class="phone-shell px-4 pb-28 pt-4">
    <div class="topbar">
      <a aria-label="Back to home" class="topbar-action" href="/">←</a>
      <p class="screen-title">Search</p>
      <div class="topbar-action text-sm"> </div>
    </div>

    <form action="/search" class="ethereal-surface mt-5 flex items-center gap-3 rounded-full px-4 py-3" method="GET">
      <span aria-hidden="true" class="text-black/46">⌕</span>
      <input
        aria-label="Search products"
        autocomplete="off"
        class="w-full bg-transparent text-sm placeholder:text-black/34 focus:outline-none"
        name="q"
        placeholder="Search anything…"
        spellcheck="false"
        type="search"
        value={query}
      />
      <button aria-label="Submit search" class="grid h-7 w-7 place-items-center rounded-full bg-black/[0.05] text-black/55" type="submit">◔</button>
    </form>

    <section class="mt-6">
      <p class="text-[0.7rem] font-extrabold uppercase tracking-[0.05em] text-black/68">Popular Searches</p>
      <div class="mt-3 flex flex-wrap gap-2">
        {#each searchSuggestions as suggestion}
          <a class="pill-chip" href={`/search?q=${encodeURIComponent(suggestion)}`}>{suggestion}</a>
        {/each}
      </div>
    </section>

    <section class="mt-6">
      <div class="flex items-center justify-between">
        <p class="text-[0.7rem] font-extrabold uppercase tracking-[0.05em] text-black/68">Results</p>
        <span class="text-[0.72rem] font-medium text-black/48">Filter ⌁</span>
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
