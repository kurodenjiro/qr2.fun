<script lang="ts">
  const sampleId = 'kuro-exe';
</script>

<svelte:head>
  <title>Ethereal QR Pay</title>
  <meta
    name="description"
    content="Fashion-first QR payment experience built with SvelteKit and MiniPay."
  />
</svelte:head>

<main class="flex min-h-screen items-center justify-center px-6 py-16">
  <div class="ethereal-surface noise w-full max-w-md rounded-[32px] bg-white/70 p-8 text-center">
    <p class="text-xs font-semibold uppercase tracking-[0.35em] text-black/45">Ethereal</p>
    <h1 class="mt-4 font-display text-5xl leading-none text-ink">Wear. Scan. Connect.</h1>
    <p class="mt-4 text-sm leading-6 text-black/60">
      Open the fashion-first payment flow and preview the soft-tech MiniPay experience.
    </p>
    <a
      href={`/qr/${sampleId}`}
      class="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
    >
      Open QR Page
    </a>
  </div>
</main>
