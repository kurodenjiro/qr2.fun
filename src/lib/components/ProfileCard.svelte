<script lang="ts">
  import { fly } from 'svelte/transition';
  import FloatingBadge from './FloatingBadge.svelte';
  import type { DisplayMode } from '$lib/types';

  export let mode: DisplayMode = 'light';
  export let profileName = 'kuro.exe';
  export let bio = 'offline body / online soul';
  export let amountLabel = '10,000 VND';
  export let qrId = '';
  export let mascotSrc = '/logo.webp';
  export let avatarLetter = 'K';
  export let labels: string[] = ['style', 'tech', 'culture'];
  export let badges: string[] = ['$299', 'DROP', 'BLACK FRIDAY'];
</script>

<section
  class={`ethereal-surface relative rounded-[30px] p-5 ${
    mode === 'dark'
      ? 'border-white/10 bg-white/[0.06] text-white shadow-[0_24px_80px_rgba(0,0,0,0.48)]'
      : 'bg-white/72 text-ink'
  }`}
  in:fly={{ y: 32, duration: 560 }}
>
  <div class="flex items-start justify-between gap-4">
    <div>
      <p class={`text-[11px] font-bold uppercase tracking-[0.3em] ${mode === 'dark' ? 'text-white/45' : 'text-black/42'}`}>
        Scan to connect
      </p>
      <h1 class="mt-3 font-display text-[2.6rem] leading-none">{profileName}</h1>
      <p class={`mt-2 max-w-[18rem] text-sm leading-6 ${mode === 'dark' ? 'text-white/68' : 'text-black/62'}`}>
        {bio}
      </p>
    </div>

    <div class="relative shrink-0">
      <div class={`soft-ring grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full ${mode === 'dark' ? 'bg-lime text-ink' : 'bg-lavender/65 text-ink'}`}>
        <span class="font-display text-3xl leading-none">{avatarLetter}</span>
      </div>
      <img
        alt="Ethereal mascot sticker"
        class="absolute -bottom-2 -right-3 h-11 w-11 rotate-[8deg] rounded-[16px] border border-white/50 bg-white/85 object-cover p-1 shadow-[0_12px_28px_rgba(17,17,17,0.18)]"
        height="44"
        src={mascotSrc}
        width="44"
      />
    </div>
  </div>

  <div class="mt-5 flex flex-wrap gap-2">
    <FloatingBadge text={badges[0] || '$299'} tone={mode === 'dark' ? 'ink' : 'lavender'} />
    <FloatingBadge text={badges[1] || 'DROP'} tone="coral" />
    <FloatingBadge text={qrId || badges[2] || 'QR'} tone={mode === 'dark' ? 'lime' : 'ink'} />
  </div>

  <div class="mt-4 flex flex-wrap gap-2">
    {#each labels as label}
      <span
        class={`rounded-full px-3 py-1 text-[11px] font-bold capitalize tracking-[0.18em] ${
          mode === 'dark' ? 'bg-white/8 text-white/72' : 'bg-black/[0.05] text-black/62'
        }`}
      >
        {label}
      </span>
    {/each}
  </div>

  <div class={`mt-5 rounded-[24px] px-4 py-4 ${mode === 'dark' ? 'bg-white/[0.06]' : 'bg-black/[0.035]'}`}>
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class={`text-[11px] font-bold uppercase tracking-[0.26em] ${mode === 'dark' ? 'text-white/45' : 'text-black/38'}`}>
          Current send
        </p>
        <p class="mt-2 text-2xl font-extrabold tracking-tight">{amountLabel}</p>
      </div>
      <div class={`rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.28em] ${mode === 'dark' ? 'bg-lime text-ink' : 'bg-mint text-ink'}`}>
        On Celo
      </div>
    </div>

    <div class="mt-4">
      <slot name="amount-selector" />
    </div>

    <div class="mt-5">
      <slot name="pay-button" />
    </div>

    <div class="mt-4 flex items-center justify-between gap-4">
      <button
        class={`text-sm font-semibold transition duration-200 hover:opacity-70 ${mode === 'dark' ? 'text-white/75' : 'text-black/62'}`}
        type="button"
      >
        View profile
      </button>
      <p class={`text-xs ${mode === 'dark' ? 'text-white/40' : 'text-black/36'}`}>Fashion-first payment layer</p>
    </div>
  </div>
</section>
