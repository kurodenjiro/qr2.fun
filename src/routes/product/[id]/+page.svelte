<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import ColorPicker from '$lib/components/ColorPicker.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import SizeSelector from '$lib/components/SizeSelector.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.product.name} | Ethereal</title>
</svelte:head>

<main class="px-4 pb-16 pt-4">
  <section class="phone-shell px-4 pb-10 pt-4">
    <div class="topbar">
      <a aria-label="Back to builder" class="topbar-action" href="/search">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </a>
      <p class="text-[0.85rem] font-extrabold uppercase tracking-[0.08em] text-black">Product Detail</p>
      <button aria-label="Share product" class="topbar-action">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
      </button>
    </div>

    <div class="mt-5 px-1 pb-5 pt-4">
      <div class="flex items-center justify-between">
        <span class="flex items-center gap-1.5 rounded-full bg-[#cdb4ff] px-3.5 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.08em] text-ink">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          New Drop
        </span>
        <span class="grid h-[2.6rem] w-[2.6rem] place-items-center rounded-full bg-white text-lg text-ink shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-black/5">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </span>
      </div>

      <div class="relative mt-2 flex items-center justify-center">
        <img alt={data.product.name} class="h-[21rem] w-[21rem] object-contain drop-shadow-xl" src={data.product.image} />
      </div>
    </div>

    <section class="mt-2 px-1">
      <h1 class="font-display text-[2rem] font-bold leading-tight text-ink">{data.product.name}</h1>
      <p class="mt-1.5 text-[1.2rem] font-extrabold text-ink">{data.product.priceLabel}</p>
    </section>

    <section class="mt-6 px-1">
      <ColorPicker colors={data.product.palette.slice(0, 5)} selected={0} />
    </section>

    <section class="mt-8 px-1">
      <div class="flex items-end justify-between">
        <p class="text-[0.72rem] font-extrabold text-black/70">Size</p>
        <span class="text-[0.72rem] font-extrabold text-black/60">Size Guide</span>
      </div>
      <div class="mt-3">
        <SizeSelector sizes={data.product.sizes} selected={data.product.sizes[1] || data.product.sizes[0]} />
      </div>
    </section>

    <div class="mt-8 px-1">
      <a href="/cart" class="relative flex w-full items-center justify-center gap-3 rounded-[1.8rem] bg-ink py-[1.15rem] text-white hover:bg-black/90 shadow-[0_12px_24px_rgba(17,17,17,0.2)] transition-all active:scale-[0.98]">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#cdb4ff" stroke="#cdb4ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="text-[#cdb4ff]"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span class="text-[0.85rem] font-extrabold uppercase tracking-[0.06em] text-white">Add To Cart</span>
      </a>
    </div>

    <section class="mt-7">
      <h2 class="text-[0.82rem] font-extrabold uppercase tracking-[0.06em] text-black/76">You May Also Like</h2>
      <div class="mt-3 flex gap-3 overflow-x-auto pb-2">
        {#each data.related as product}
          <ProductCard compact={true} {product} />
        {/each}
      </div>
    </section>
  </section>
</main>
