<script lang="ts">
  import type { Product } from '$lib/types';

  export let product: Product;
  export let compact = false;
</script>

<a
  class={`group block ${
    compact ? 'w-[9.9rem]' : 'w-full'
  }`}
  href={`/product/${product.id}`}
>
  <div class="relative overflow-hidden rounded-[1.4rem] p-1 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]" style={`background: ${product.palette[1] || product.palette[0] || '#f3f4f6'}`}>
    <button
      aria-label="Add to wishlist"
      class="absolute right-3 top-3 z-10 grid h-[1.85rem] w-[1.85rem] place-items-center rounded-full bg-white text-black shadow-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    </button>
    <div class="flex aspect-[1/1] items-end justify-center p-2 pt-5">
      <img
        alt={product.name}
        class={`max-h-[100%] w-auto object-contain mix-blend-multiply transition duration-300 group-hover:scale-105`}
        src={product.image}
      />
    </div>
  </div>

  <div class="px-1 pb-1 pt-3">
    <h3 class="text-[0.82rem] font-bold leading-tight text-ink">{product.name}</h3>
    <p class="mt-0.5 text-[0.95rem] font-extrabold text-ink">{product.priceLabel}</p>
  </div>
</a>
