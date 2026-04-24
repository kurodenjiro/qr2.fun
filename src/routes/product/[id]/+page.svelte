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
      <a aria-label="Back to builder" class="topbar-action" href="/builder">←</a>
      <p class="screen-title">Product Detail</p>
      <a aria-label="Share product" class="topbar-action" href="/cart">⇪</a>
    </div>

    <section class="product-stage mt-5 rounded-[2rem] px-4 pb-5 pt-4">
      <div class="flex items-center justify-between">
        <span class="rounded-full bg-lilac px-3 py-1 text-[0.63rem] font-bold uppercase tracking-[0.12em] text-black/72">
          ✦ New Drop
        </span>
        <span class="grid h-10 w-10 place-items-center rounded-full bg-white/88 text-lg text-black/60">♡</span>
      </div>

      <div class="relative mt-3 flex items-center justify-center">
        <img alt={data.product.name} class="h-[19rem] w-[19rem] object-contain" height="304" src={data.product.image} width="304" />
      </div>
    </section>

    <section class="mt-5">
      <h1 class="font-display text-[2.45rem] leading-none text-ink">{data.product.name}</h1>
      <p class="mt-2 text-[2rem] font-extrabold text-ink">{data.product.priceLabel}</p>
    </section>

    <section class="mt-5">
      <ColorPicker colors={data.product.palette} selected={1} />
    </section>

    <section class="mt-6">
      <div class="flex items-center justify-between">
        <p class="text-[0.72rem] font-medium text-black/56">Size</p>
        <span class="text-[0.72rem] font-medium text-black/56">Size Guide</span>
      </div>
      <div class="mt-3">
        <SizeSelector sizes={data.product.sizes} selected={data.product.sizes[1] || data.product.sizes[0]} />
      </div>
    </section>

    <div class="mt-6">
      <Button href="/cart" variant="primary" full={true}>
        <span>⌂</span>
        <span>Add To Cart</span>
      </Button>
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
