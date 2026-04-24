<script lang="ts">
  import QRProfile from '$lib/components/QRProfile.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.profile.name} | QR Identity</title>
</svelte:head>

<main class="px-4 py-4">
  <section class="phone-shell bg-transparent px-4 pb-6 pt-4 shadow-none">
    <div class="topbar text-white">
      <a
        aria-label="Back to checkout"
        class="topbar-action text-white"
        href="/checkout"
      >
        ←
      </a>
      <p class="screen-title text-white/95"> </p>
      <span class="topbar-action text-white">⋯</span>
    </div>

    <div class="mt-2">
      <QRProfile amount={10000} profile={data.profile} />
    </div>
  </section>
</main>
