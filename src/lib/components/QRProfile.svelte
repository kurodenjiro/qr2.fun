<script lang="ts">
  import type { ProfileData } from '$lib/types';
  import { buildClaimRewardDeepLink, buildMiniPayDeepLink, isMiniPayAvailable } from '$lib/web3/minipay';

  export let profile: ProfileData;
  export let amount = 10000;

  function open(url: string) {
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
  }

  function handleSend() {
    open(isMiniPayAvailable() ? buildMiniPayDeepLink(profile.walletAddress, amount) : '/install');
  }

  function handleClaim() {
    open(isMiniPayAvailable() ? buildClaimRewardDeepLink() : '/install');
  }
</script>

<section class="relative overflow-hidden rounded-[2rem] bg-[#080808] px-5 pb-7 pt-8 text-white shadow-[0_28px_70px_rgba(0,0,0,0.38)]">
  <div class="absolute inset-x-0 top-12 h-px bg-[linear-gradient(90deg,transparent,#d6f36a,transparent)] opacity-70"></div>
  <div class="absolute left-1/2 top-12 h-36 w-36 -translate-x-1/2 rounded-full border-4 border-lime"></div>
  <div class="absolute left-1/2 top-12 h-36 w-36 -translate-x-1/2 rounded-full shadow-[0_0_50px_rgba(198,242,109,0.45)]"></div>

  <div class="relative z-10 flex flex-col items-center text-center">
    <div class="relative">
      <div class="absolute inset-0 rounded-full bg-lime/30 blur-2xl"></div>
      <div class="relative grid h-36 w-36 place-items-center overflow-hidden rounded-full border-[5px] border-lime bg-[radial-gradient(circle_at_top,#3a3a3a_0%,#171717_100%)]">
        <span class="font-display text-6xl text-white">{profile.avatarLetter}</span>
      </div>
    </div>

    <h1 class="mt-7 text-[2rem] font-extrabold text-lime">{profile.name}</h1>
    <p class="mt-2 text-lg text-white/92">{profile.bio}</p>

    <button
      class="mt-10 inline-flex w-full items-center justify-between rounded-full bg-lime px-6 py-4 text-base font-extrabold uppercase tracking-[0.03em] text-black transition-transform hover:scale-[1.01]"
      type="button"
      on:click={handleSend}
    >
      <span>Send Tip</span>
      <span>➤</span>
    </button>

    <button
      class="mt-4 inline-flex w-full items-center justify-between rounded-full border border-lilac/65 px-6 py-4 text-base font-semibold uppercase tracking-[0.03em] text-lilac transition-colors hover:bg-lilac/10"
      type="button"
      on:click={handleClaim}
    >
      <span>Claim Reward</span>
      <span>⌁</span>
    </button>

    <a class="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/86" href="/search">
      <span>⟳</span>
      <span>Scan Again</span>
    </a>
  </div>
</section>
