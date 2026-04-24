<script lang="ts">
  import BottomNav from '$lib/components/BottomNav.svelte';
  import Button from '$lib/components/Button.svelte';
  import { categories, products } from '$lib/data/products';

  const stylingOptions = [
    { label: 'Outerwear', icon: '◍' },
    { label: 'Accessories', icon: '⌁' }
  ];
  const builderSections = [...categories, ...stylingOptions];
</script>

<svelte:head>
  <title>Outfit Builder | Ethereal</title>
</svelte:head>

<main class="px-4 pb-32 pt-4">
  <section class="phone-shell px-4 pb-28 pt-4">
    <div class="topbar">
      <a aria-label="Back to home" class="topbar-action" href="/">←</a>
      <p class="screen-title">Outfit Builder</p>
      <a aria-label="Download look" class="topbar-action rounded-2xl bg-black text-white" href="/try">⇩</a>
    </div>

    <section class="mt-5 grid grid-cols-[4rem,1fr,4rem] gap-3">
      <div class="ethereal-surface flex flex-col gap-3 rounded-[1.55rem] p-2.5">
        {#each builderSections as item, index}
          <a
            class={`flex flex-col items-center gap-1 rounded-[1rem] px-2 py-2 text-center text-[0.65rem] font-medium ${
              index === 0 ? 'bg-[#eef7b8] text-black shadow-[0_10px_24px_rgba(198,242,109,0.24)]' : 'text-black/62'
            }`}
            href="/search"
          >
            <span class="grid h-8 w-8 place-items-center rounded-full bg-white/88 text-sm">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        {/each}
      </div>

      <div class="ethereal-surface rounded-[1.8rem] bg-[radial-gradient(circle_at_top,#fff4fb_0%,#f5f8d8_62%,#fffdf9_100%)] p-3">
        <div class="relative flex min-h-[24rem] items-end justify-center overflow-hidden rounded-[1.35rem]">
          <div class="absolute left-[10%] top-[12%] h-24 w-24 rounded-full bg-[#f6c8ea] blur-2xl"></div>
          <div class="absolute right-[10%] top-[20%] h-24 w-24 rounded-full bg-[#dbf4ab] blur-2xl"></div>
          <div class="absolute inset-y-8 left-0 w-px bg-[linear-gradient(180deg,transparent,#f1e978,transparent)]"></div>
          <div class="absolute inset-y-10 right-0 w-px bg-[linear-gradient(180deg,transparent,#f1e978,transparent)]"></div>
          <img
            alt="Builder model"
            class="relative z-10 h-[23rem] w-[16rem] rounded-[1.8rem] object-cover object-center"
            height="368"
            src="/assets/hero-model.jpg"
            width="256"
          />
        </div>
      </div>

      <div class="flex flex-col gap-3">
        {#each products as product}
          <a class="ethereal-surface product-stage flex h-[4.9rem] items-center justify-center rounded-[1.15rem] p-2" href={`/product/${product.id}`}>
            <img alt={product.name} class="h-14 w-14 object-contain" height="56" src={product.image} width="56" />
          </a>
        {/each}
      </div>
    </section>

    <div class="mt-5 grid grid-cols-2 gap-3">
      <Button href="/search" variant="ghost">Randomize</Button>
      <Button href="/product/short-jacket" variant="secondary">Auto Complete</Button>
    </div>

    <div class="ethereal-surface mt-4 rounded-[1.45rem] px-4 py-3">
      <div class="flex items-center justify-between text-[0.82rem] font-semibold">
        <span>Style Match</span>
        <span>92%</span>
      </div>
      <div class="mt-3 h-2 rounded-full bg-black/[0.05]">
        <div class="h-full w-[92%] rounded-full bg-lime"></div>
      </div>
    </div>
  </section>

  <BottomNav current="builder" />
</main>
