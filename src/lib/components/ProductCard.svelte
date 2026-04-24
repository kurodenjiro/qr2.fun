<script lang="ts">
  import type { Product } from '$lib/types';

  export let product: Product;
  export let compact = false;
</script>

<a
  class={`ethereal-surface group block rounded-[1.4rem] p-2.5 transition duration-200 hover:-translate-y-1 ${
    compact ? 'w-[9.9rem]' : 'w-full'
  }`}
  href={`/product/${product.id}`}
>
  <div class="product-stage relative rounded-[1.15rem]">
    <span
      aria-hidden="true"
      class="absolute right-2.5 top-2.5 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/88 text-[0.9rem] text-black/55 shadow-[0_8px_18px_rgba(17,17,17,0.08)]"
    >
      ♡
    </span>
    <div class="flex aspect-[1/1] items-center justify-center p-3">
      <img
        alt={product.name}
        class={`object-contain transition duration-300 group-hover:scale-105 ${compact ? 'h-28 w-28' : 'h-32 w-32'}`}
        height="128"
        src={product.image}
        width="128"
      />
    </div>
  </div>

  <div class="px-1 pb-1 pt-2.5">
    <div class="flex items-start justify-between gap-2">
      <div>
        <h3 class="text-[0.9rem] font-semibold leading-tight text-ink">{product.name}</h3>
        <p class="mt-1 text-[0.72rem] text-black/46">{product.shortDescription}</p>
      </div>
      <span class="text-[0.9rem] font-extrabold text-ink">{product.priceLabel}</span>
    </div>
  </div>
</a>
