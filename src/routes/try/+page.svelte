<svelte:head>
  <title>Virtual Try-On | Ethereal</title>
</svelte:head>

<main class="px-4 pb-16 pt-4">
  <section class="phone-shell overflow-hidden bg-[#f7f2eb] px-4 pb-0 pt-4">
    <div class="topbar">
      <a aria-label="Back to builder" class="topbar-action" href="/builder">←</a>
      <p class="screen-title">Virtual Try-On</p>
      <a aria-label="Capture options" class="topbar-action" href="/product/short-jacket">⌘</a>
    </div>

    <section class="mt-4">
      <div class="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#f5ece4_0%,#f0e4da_100%)] px-3 pt-4">
        <div class="absolute left-4 top-8 flex flex-col gap-3">
          <a class="ethereal-surface flex h-14 w-14 items-center justify-center rounded-[1rem] bg-[#f0f8c5] text-[0.72rem] font-semibold text-lime-900" href="/product/short-jacket">
            Jacket
          </a>
          <span class="ethereal-surface flex h-12 w-12 items-center justify-center rounded-[1rem] text-black/55">⌇</span>
          <span class="ethereal-surface flex h-12 w-12 items-center justify-center rounded-[1rem] text-black/55">◌</span>
          <span class="ethereal-surface flex h-12 w-12 items-center justify-center rounded-[1rem] text-black/55">⌁</span>
        </div>

        <img
          alt="Virtual try-on"
          class="mx-auto h-[28rem] w-[19rem] rounded-[1.8rem] object-cover object-center"
          height="448"
          src="/assets/hero-model.jpg"
          width="304"
        />
      </div>
    </section>

    <div class="mt-4 flex items-center justify-between rounded-t-[2rem] bg-black px-5 py-4 text-white">
      <a aria-label="Open gallery" class="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-2xl" href="/search">⌲</a>
      <button aria-label="Capture look" class="grid h-16 w-16 place-items-center rounded-full border-[6px] border-[#d9bbef] bg-[#efdcff]" type="button"></button>
      <button aria-label="Switch camera" class="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-2xl" type="button">↻</button>
    </div>
  </section>
</main>
