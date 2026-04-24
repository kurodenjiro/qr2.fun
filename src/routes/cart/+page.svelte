<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { products } from '$lib/data/products';

  const cartItems = products.slice(0, 3);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
</script>

<svelte:head>
  <title>Cart | Ethereal</title>
</svelte:head>

<main class="px-4 pb-16 pt-4">
  <section class="phone-shell px-4 pb-8 pt-4">
    <div class="topbar">
      <a aria-label="Back to product" class="topbar-action" href="/product/short-jacket">←</a>
      <p class="screen-title">Cart ({cartItems.length})</p>
      <a class="text-sm font-semibold text-black/58" href="/checkout">Edit</a>
    </div>

    <section class="mt-5 space-y-3">
      {#each cartItems as item}
        <div class="ethereal-surface rounded-[1.65rem] p-3">
          <div class="grid grid-cols-[4.7rem,1fr,4.4rem] items-center gap-3">
            <div class="product-stage flex h-[4.7rem] items-center justify-center rounded-[1rem]">
              <img alt={item.name} class="h-14 w-14 object-contain" height="56" src={item.image} width="56" />
            </div>
            <div class="min-w-0">
              <h2 class="truncate text-[0.95rem] font-semibold text-ink">{item.name}</h2>
              <p class="mt-1 text-[0.73rem] text-black/48">{item.shortDescription}</p>
              <p class="mt-2 text-[1.35rem] font-extrabold text-ink">{item.priceLabel}</p>
            </div>
            <div class="flex items-center justify-end gap-2 text-black/55">
              <span class="grid h-7 w-7 place-items-center rounded-full border border-black/8">−</span>
              <span class="text-sm font-semibold text-ink">1</span>
              <span class="grid h-7 w-7 place-items-center rounded-full border border-black/8">+</span>
            </div>
          </div>
        </div>
      {/each}
    </section>

    <section class="ethereal-surface mt-4 rounded-[1.5rem] p-3">
      <div class="flex items-center justify-between gap-3 rounded-full bg-[#fbfaf7] px-4 py-3">
        <span class="text-sm text-black/36">Promo Code</span>
        <button class="rounded-full bg-black/[0.05] px-4 py-2 text-[0.78rem] font-semibold text-black/58" type="button">Apply</button>
      </div>
    </section>

    <section class="mt-4 px-1">
      <div class="flex items-center justify-between">
        <span class="text-[1.05rem] text-ink">Total</span>
        <span class="text-[2rem] font-extrabold text-ink">${total}</span>
      </div>
    </section>

    <div class="mt-4">
      <Button href="/checkout" variant="secondary" full={true}>Checkout</Button>
    </div>
  </section>
</main>
