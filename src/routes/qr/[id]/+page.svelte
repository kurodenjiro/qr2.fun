<script lang="ts">
  import { goto } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import AmountSelector from '$lib/components/AmountSelector.svelte';
  import FloatingBadge from '$lib/components/FloatingBadge.svelte';
  import PayButton from '$lib/components/PayButton.svelte';
  import ProfileCard from '$lib/components/ProfileCard.svelte';
  import type { AmountOption } from '$lib/types';
  import { buildMiniPayDeepLink, formatCompactVnd, isMiniPayAvailable, tryBuildTipTransaction } from '$lib/web3/minipay';
  import { isContractConfigured } from '$lib/config/wearToEarn';
  import type { PageData } from './$types';

  export let data: PageData;

  const profile = data.profile;
  const amountOptions: AmountOption[] = [
    ...profile.amountPresets.map((amount) => ({
      label: `${Math.round(amount / 1000)}k`,
      value: amount
    })),
    { label: 'custom', value: 'custom' }
  ];

  let selectedAmount: number | 'custom' = profile.amountPresets[0] ?? 10000;
  let customValue = '';
  let loading = false;
  let success = false;

  function selectAmount(value: number | 'custom') {
    selectedAmount = value;
  }

  function setCustomValue(value: string) {
    customValue = value.replace(/[^\d]/g, '').slice(0, 7);
  }

  function resolveAmount() {
    if (selectedAmount === 'custom') {
      return Number(customValue || 0);
    }

    return selectedAmount;
  }

  function formatAmountLabel() {
    const amount = resolveAmount();

    if (!amount) {
      return 'Pick amount';
    }

    return formatCompactVnd(amount);
  }

  async function handlePay() {
    const amount = resolveAmount();

    if (!amount) {
      selectedAmount = 'custom';
      return;
    }

    loading = true;

    if (isMiniPayAvailable()) {
      success = true;
      const redirectUrl = buildMiniPayDeepLink(profile.walletAddress, amount);

      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 550);

      return;
    }

    await goto('/install');
    loading = false;
  }

  $: transactionPreview =
    resolveAmount() > 0 ? tryBuildTipTransaction(profile.walletAddress, resolveAmount()) : null;
</script>

<svelte:head>
  <title>{profile.name} | Ethereal QR Pay</title>
  <meta
    name="description"
    content="A soft-tech MiniPay QR payment experience for Ethereal fashion drops."
  />
</svelte:head>

<main
  class={`relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 ${
    data.mode === 'dark' ? 'bg-[#111111] text-white' : 'text-ink'
  }`}
>
  <div class="ethereal-blob left-[-3rem] top-12 h-40 w-40 bg-lavender/70"></div>
  <div class="ethereal-blob right-[-2rem] top-28 h-32 w-32 bg-coral/45"></div>
  <div class="ethereal-blob bottom-28 right-10 h-44 w-44 bg-mint/65"></div>
  <div
    class={`absolute inset-0 ${
      data.mode === 'dark'
        ? success
          ? 'bg-[radial-gradient(circle_at_top,#d7ff81_0%,transparent_24%),linear-gradient(180deg,#111111_0%,#17210d_100%)]'
          : 'bg-[radial-gradient(circle_at_top,#243014_0%,transparent_32%),linear-gradient(180deg,#111111_0%,#171717_100%)]'
        : success
          ? 'bg-[radial-gradient(circle_at_top,_rgba(198,242,109,0.95)_0%,_transparent_30%),linear-gradient(180deg,#d8ff85_0%,#f3ffd5_46%,#fff8fb_100%)]'
          : 'bg-[radial-gradient(circle_at_top,_rgba(235,213,247,0.75)_0%,_transparent_32%),linear-gradient(180deg,#d4f87f_0%,#fafafb_54%,#fff8fb_100%)]'
    }`}
  ></div>

  <section class="relative mx-auto flex min-h-[100dvh] w-full max-w-sm flex-col justify-center">
    <div class="mb-5 flex items-center justify-between px-1" in:fade={{ duration: 320 }}>
      <div>
        <p class={`text-[11px] font-extrabold uppercase tracking-[0.34em] ${data.mode === 'dark' ? 'text-white/42' : 'text-black/40'}`}>
          QR identity
        </p>
        <p class={`mt-2 text-sm ${data.mode === 'dark' ? 'text-white/62' : 'text-black/55'}`}>
          Scan to connect
        </p>
      </div>

      {#if success}
        <FloatingBadge text="Payment Sent ✨" tone="lime" className="rotate-[-6deg]" />
      {:else}
        <FloatingBadge text="Black Friday" tone={data.mode === 'dark' ? 'ink' : 'lavender'} className="rotate-[6deg]" />
      {/if}
    </div>

    <ProfileCard
      amountLabel={formatAmountLabel()}
      bio={profile.bio}
      mode={data.mode}
      profileName={profile.name}
      qrId={data.qrId}
      avatarLetter={profile.avatarLetter}
      labels={profile.labels}
      badges={profile.badges}
    >
      <svelte:fragment slot="amount-selector">
        <AmountSelector
          customValue={customValue}
          onCustomValueChange={setCustomValue}
          onSelect={selectAmount}
          options={amountOptions}
          selected={selectedAmount}
        />
      </svelte:fragment>

      <svelte:fragment slot="pay-button">
        <PayButton loading={loading} onClick={handlePay} />
      </svelte:fragment>
    </ProfileCard>

    <div
      class={`ethereal-surface mt-4 rounded-[28px] p-4 ${
        data.mode === 'dark' ? 'border-white/8 bg-white/[0.06]' : 'bg-white/58'
      }`}
      in:fly={{ y: 24, duration: 600, delay: 80 }}
    >
      <div class="flex items-center gap-3">
        <div class={`grid h-12 w-12 place-items-center rounded-[18px] ${data.mode === 'dark' ? 'bg-lime text-ink' : 'bg-sunshine text-ink'}`}>
          <img alt="Mascot" class="h-9 w-9 rounded-[12px] object-cover" src="/logo.webp" />
        </div>
        <div>
          <p class={`text-xs font-extrabold uppercase tracking-[0.24em] ${data.mode === 'dark' ? 'text-white/40' : 'text-black/38'}`}>
            Soft-tech note
          </p>
          <p class={`mt-1 text-sm leading-6 ${data.mode === 'dark' ? 'text-white/72' : 'text-black/65'}`}>
            Crypto stays invisible. The page feels like a fashion tag first, payment rail second.
          </p>
        </div>
      </div>
    </div>

    <div
      class={`ethereal-surface mt-4 rounded-[28px] p-4 ${
        data.mode === 'dark' ? 'border-white/8 bg-white/[0.06]' : 'bg-white/60'
      }`}
      in:fly={{ y: 28, duration: 620, delay: 120 }}
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class={`text-[11px] font-extrabold uppercase tracking-[0.28em] ${data.mode === 'dark' ? 'text-white/42' : 'text-black/38'}`}>
            Real data layer
          </p>
          <p class={`mt-2 text-sm leading-6 ${data.mode === 'dark' ? 'text-white/72' : 'text-black/66'}`}>
            Payments hit the Wear-to-Earn contract, not the profile wallet directly.
          </p>
        </div>
        <FloatingBadge text={isContractConfigured() ? 'Contract Live' : 'Set Contract'} tone="lime" />
      </div>

      <div class={`mt-4 rounded-[22px] p-4 text-sm ${data.mode === 'dark' ? 'bg-white/[0.04]' : 'bg-black/[0.035]'}`}>
        <div class="flex items-center justify-between gap-4">
          <span class={data.mode === 'dark' ? 'text-white/52' : 'text-black/45'}>Wallet</span>
          <span class="max-w-[13rem] truncate font-semibold">{profile.walletAddress}</span>
        </div>
        <div class="mt-3 flex items-center justify-between gap-4">
          <span class={data.mode === 'dark' ? 'text-white/52' : 'text-black/45'}>Received</span>
          <span class="font-semibold">{profile.stats.totalReceivedCusd} cUSD</span>
        </div>
        <div class="mt-3 flex items-center justify-between gap-4">
          <span class={data.mode === 'dark' ? 'text-white/52' : 'text-black/45'}>Claims</span>
          <span class="font-semibold">{profile.stats.totalClaims}</span>
        </div>
        <div class="mt-3 flex items-center justify-between gap-4">
          <span class={data.mode === 'dark' ? 'text-white/52' : 'text-black/45'}>Rank</span>
          <span class="font-semibold">{profile.stats.rank}</span>
        </div>
        {#if transactionPreview}
          <div class="mt-3 flex items-center justify-between gap-4">
            <span class={data.mode === 'dark' ? 'text-white/52' : 'text-black/45'}>Tx value</span>
            <span class="font-semibold">{transactionPreview.valueDisplay} CELO</span>
          </div>
        {/if}
      </div>
    </div>

    <div class="mt-4 flex items-center justify-between px-1 text-xs">
      <span class={data.mode === 'dark' ? 'text-white/38' : 'text-black/35'}>MiniPay detection via user agent</span>
      <a
        class={`font-semibold underline decoration-transparent transition hover:decoration-current ${data.mode === 'dark' ? 'text-lime' : 'text-ink'}`}
        href={data.mode === 'dark' ? `/qr/${data.qrId}` : `/qr/${data.qrId}?mode=dark`}
      >
        {data.mode === 'dark' ? 'Light mode' : 'Dark mode'}
      </a>
    </div>
  </section>
</main>
