<script lang="ts">
  import BottomNav from "$lib/components/BottomNav.svelte";
  import { products } from "$lib/data/products";
  import type { PageData } from './$types';

  export let data: PageData;
  
  // Use Shopify products if available, fallback to static products
  const displayProducts = data.shopifyProducts?.length > 0 ? data.shopifyProducts : products;

  $: homePicks = [
    {
      product: displayProducts[0] || products[0],
      background: "#edf7d1",
    },
    {
      product: displayProducts[1] || products[1],
      background: "#e9d4fb",
    },
  ];
</script>

<svelte:head>
  <title>Ethereal</title>
  <meta
    name="description"
    content="Fashion-first storefront with AI styling, MiniPay checkout, and QR identity."
  />
</svelte:head>

<main class="">
  <section class="phone-shell overflow-hidden pb-28">
    <section
      class="relative bg-[linear-gradient(180deg,#f6fad5_0%,#f2ffd4_58%,#eef9c9_100%)] px-5 pb-[7.5rem] pt-7"
    >
      <div
        class="absolute -left-8 top-28 h-28 w-28 rounded-full bg-white/28 blur-3xl"
      ></div>
      <div
        class="absolute right-[-1.5rem] top-16 h-48 w-48 rounded-full bg-[#c8f2b5] blur-[52px]"
      ></div>
      <div
        class="absolute right-8 top-28 h-28 w-28 rounded-full bg-white/30 blur-2xl"
      ></div>

      <div class="topbar relative z-20 mb-8">
        <div class="flex shrink-0 items-center gap-2">
          <span class="text-[0.7rem] -mt-0.5">✦</span>
          <p
            class="font-display text-[0.88rem] font-bold uppercase tracking-[0.12em] text-ink"
          >
            Ethereal
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="topbar-action relative mr-2">
            <svg
              aria-hidden="true"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 17H5.5a1 1 0 0 1-.8-1.6l1.55-2.05V9.5a5.75 5.75 0 1 1 11.5 0v3.85l1.55 2.05a1 1 0 0 1-.8 1.6H15Zm0 0a3 3 0 0 1-6 0"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
              />
            </svg>
            <span
              class="absolute right-[0.1rem] top-[0.1rem] h-[0.55rem] w-[0.55rem] rounded-full border-2 border-[#f6fad5] bg-[#ff6c6c]"
            ></span>
          </span>

          <img
            alt="Mascot"
            class="h-11 w-11 object-contain drop-shadow-md"
            src="/logo.png"
          />
        </div>
      </div>

      <div class="relative z-10 w-full">
        <div class="relative z-20 max-w-none">
          <h1
            class="font-display text-[3.2rem] font-bold leading-[0.94] tracking-[-0.02em] text-ink whitespace-nowrap"
          >
            Loud Looks.<br />Quiet Rules.
          </h1>

          <div
            class="mt-6 space-y-1 text-[0.85rem] font-bold uppercase tracking-[0.08em] text-ink/80"
          >
            <p>AI-POWERED STYLE.</p>
            <p>MADE PERSONAL.</p>
          </div>

          <a
            class="relative z-30 mt-8 inline-flex h-[2.8rem] w-[11.5rem] items-center justify-between rounded-full bg-[#111111] pl-5 pr-1 shadow-[0_16px_36px_rgba(17,17,17,0.2)]"
            href="/search"
          >
            <span
              class="whitespace-nowrap text-[0.62rem] font-bold uppercase tracking-[0.04em] text-white"
              >Start Exploring</span
            >
            <span
              class="grid h-[2.15rem] w-[2.15rem] shrink-0 place-items-center rounded-full bg-[#c6f26d] text-ink"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
              >
            </span>
          </a>
        </div>
      </div>

      <img
        alt="Featured fashion model"
        class="absolute top-[8rem] right-[0rem] z-10 w-[10.5rem] max-w-none object-contain pointer-events-none drop-shadow-2xl"
        src="/assets/home-hero-model-transparent.png"
      />

      <div
        class="pointer-events-none absolute bottom-[6.8rem] left-[-20%] z-0 flex w-[200%] rotate-[-12deg] overflow-visible bg-white/80 py-1 shadow-sm"
      >
        <div
          class="animate-marquee flex whitespace-nowrap font-display text-[1.8rem] font-bold uppercase tracking-[0.2em]"
          style="-webkit-text-stroke: 1px rgba(228,161,245,0.7); color: transparent;"
        >
          <span class="pr-6"
            >BLACK FRIDAY ✦ ETHEREAL ✦ BLACK FRIDAY ✦ ETHEREAL ✦</span
          >
          <span class="pr-6"
            >BLACK FRIDAY ✦ ETHEREAL ✦ BLACK FRIDAY ✦ ETHEREAL ✦</span
          >
        </div>
      </div>
      <div
        class="pointer-events-none absolute bottom-[2.5rem] left-[-20%] z-0 flex w-[200%] rotate-[-5deg] overflow-visible"
      >
        <div
          class="animate-marquee-reverse flex whitespace-nowrap font-display text-[1.8rem] font-bold uppercase tracking-[0.2em]"
          style="-webkit-text-stroke: 1.5px rgba(188,230,103,0.8); color: rgba(198,242,109,0.3);"
        >
          <span class="pr-6">
            {#each data.shopifyProducts as p}
              {p.id} ✦ 
            {/each}
          </span>
        </div>
      </div>
    </section>

    <section class="relative z-30 -mt-[4rem] px-4 pb-5 pt-8">
      <div
        class="absolute inset-x-0 bottom-0 top-0 z-[-1] origin-top-right -translate-y-4 -rotate-[2.5deg] scale-105 rounded-[2.5rem] bg-white shadow-[0_-12px_24px_rgba(255,255,255,0.5),0_0_36px_rgba(0,0,0,0.04)]"
      ></div>

      <div class="flex items-center justify-between px-1">
        <h2
          class="text-[0.95rem] font-extrabold uppercase tracking-[0.04em] text-black/86"
        >
          AI Picks For You
        </h2>
        <a class="text-[0.76rem] font-semibold text-black/58" href="/search"
          >See all</a
        >
      </div>

      <div class="mt-4 grid grid-cols-2 gap-3">
        {#each homePicks as pick}
          <a class="group block" href={`/product/${pick.product.id}`}>
            <div
              class="relative overflow-hidden rounded-[1.4rem] p-1 pt-3 transition-transform duration-300 group-hover:scale-[1.02]"
              style={`background:${pick.background}`}
            >
              <button
                aria-label="Add to wishlist"
                class="absolute right-3 top-3 z-10 grid h-[1.85rem] w-[1.85rem] place-items-center rounded-full bg-white text-black shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                  /></svg
                >
              </button>

              <div class="flex h-[8.5rem] items-end justify-center">
                <img
                  alt={pick.product.name}
                  class="max-h-full w-auto object-contain mix-blend-multiply"
                  src={pick.product.image}
                />
              </div>
            </div>

            <div class="px-1 pb-1 pt-3">
              <h3 class="text-[0.82rem] font-bold leading-tight text-ink">
                {pick.product.name}
              </h3>
              <p class="mt-0.5 text-[0.95rem] font-extrabold text-ink">
                {pick.product.priceLabel}
              </p>
            </div>
          </a>
        {/each}
      </div>
    </section>
  </section>

  <BottomNav current="home" />
</main>

<style>
  @keyframes marquee {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  @keyframes marquee-reverse {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  :global(.animate-marquee) {
    animation: marquee 20s linear infinite;
  }
  :global(.animate-marquee-reverse) {
    animation: marquee-reverse 25s linear infinite;
  }
</style>
