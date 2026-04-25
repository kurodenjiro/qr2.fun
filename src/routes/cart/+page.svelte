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
    <div class="topbar px-2">
      <a aria-label="Back to product" class="topbar-action" href="/product/short-jacket">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </a>
      <p class="text-[0.85rem] font-extrabold uppercase tracking-[0.08em] text-black">Cart ({cartItems.length})</p>
      <button class="text-[0.85rem] font-bold text-black" type="button">Edit</button>
    </div>

    <section class="mt-8 flex flex-col gap-6 px-2">
      {#each cartItems as item}
        <div class="flex items-center gap-4">
          <div class="flex h-[5.8rem] w-[5.8rem] shrink-0 items-center justify-center rounded-[1.3rem] p-1.5" style={`background: ${item.palette[1] || item.palette[0] || '#f3f4f6'}`}>
            <img alt={item.name} class="max-h-[95%] w-auto object-contain mix-blend-multiply" src={item.image} />
          </div>
          <div class="flex min-w-0 flex-1 flex-col">
            <h2 class="truncate text-[0.95rem] font-bold text-ink">{item.name}</h2>
            <p class="mt-0.5 text-[0.75rem] font-medium text-black/50">{item.shortDescription}</p>
            <div class="mt-3 flex items-center justify-between">
              <p class="text-[1.1rem] font-extrabold text-ink">{item.priceLabel}</p>
              <div class="flex items-center gap-3">
                <button aria-label="Decrease quantity" class="grid h-7 w-7 place-items-center rounded-full border border-black/10 bg-white text-black/60 shadow-sm" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg>
                </button>
                <span class="text-[0.85rem] font-bold text-ink">1</span>
                <button aria-label="Increase quantity" class="grid h-7 w-7 place-items-center rounded-full border border-black/10 bg-white text-black/60 shadow-sm" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </section>

    <div class="relative z-30 mt-10 rounded-[2rem] bg-white px-5 pb-6 pt-6 shadow-[0_-4px_35px_rgba(0,0,0,0.06)] border border-black/5">
      <div class="flex items-center justify-between gap-3 rounded-[1.8rem] border border-black/10 pl-5 pr-2 py-1.5 focus-within:border-black/20">
        <input class="w-full bg-transparent text-[0.8rem] font-medium text-ink placeholder:text-black/40 focus:outline-none" placeholder="Promo Code" type="text" />
        <button class="rounded-full bg-[#f4f2f6] px-6 py-2.5 text-[0.8rem] font-bold text-ink hover:bg-[#e8e4ec]" type="button">Apply</button>
      </div>

      <div class="mt-7 flex items-center justify-between px-1">
        <span class="text-[1.1rem] font-bold text-ink">Total</span>
        <span class="text-[1.7rem] font-extrabold text-ink">${total}</span>
      </div>

      <div class="mt-6">
        <a href="/checkout" class="block w-full text-center rounded-[1.8rem] bg-[#d2f371] py-[1.15rem] text-[0.95rem] font-extrabold uppercase tracking-[0.05em] text-ink hover:bg-[#c4ec50] shadow-[0_8px_20px_rgba(210,243,113,0.3)]">
          Checkout
        </a>
      </div>
    </div>
  </section>
</main>
