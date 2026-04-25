<script lang="ts">
  let selectedMethod = 'minipay';
</script>

<svelte:head>
  <title>Checkout | Ethereal</title>
</svelte:head>

<main class="px-4 pb-16 pt-4">
  <section class="phone-shell px-4 pb-12 pt-4">
    <div class="topbar px-2">
      <a aria-label="Back to cart" class="topbar-action" href="/cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </a>
      <p class="text-[0.85rem] font-extrabold uppercase tracking-[0.08em] text-black">Checkout</p>
      <div class="topbar-action"></div>
    </div>

    <section class="mt-8 px-2">
      <div class="flex items-center justify-between">
        <p class="text-[0.7rem] font-extrabold uppercase tracking-[0.05em] text-black/80">Shipping Address</p>
      </div>
      
      <div class="relative mt-4 flex items-start justify-between">
        <div class="space-y-1 text-[0.9rem] font-medium leading-6 text-black/90">
          <p class="font-bold text-black">Jane Cooper</p>
          <p>+1 212-555-0188</p>
          <p>123 Fashion St.</p>
          <p>New York, NY 10001</p>
        </div>
        <button class="text-[0.72rem] font-bold text-black/50" type="button">Change</button>
      </div>
    </section>

    <div class="mx-2 mt-6 h-px bg-black/5"></div>

    <section class="mt-7 px-2 text-black">
      <p class="text-[0.7rem] font-extrabold uppercase tracking-[0.05em] text-black/80">Payment Method</p>
      <div class="mt-5 space-y-3">
        <!-- Apple Pay -->
        <button
          type="button"
          on:click={() => selectedMethod = 'apple'}
          class="flex w-full items-center justify-between rounded-[1.2rem] border px-4 py-3.5 transition-all {selectedMethod === 'apple' ? 'border-ink bg-ink/5' : 'border-black/10 bg-white'}"
        >
          <div class="flex items-center gap-3">
            <span class="grid h-8 w-8 place-items-center rounded-lg border border-black/5 bg-gray-50/50">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05 1.72-3.23 1.72-1.15 0-1.55-.71-2.92-.71-1.37 0-1.85.71-2.88.71-1.12 0-2.18-.74-3.25-1.72-2.13-1.95-3.35-5.22-3.35-8.08 0-4.32 2.68-6.58 5.25-6.58 1.35 0 2.45.85 3.32.85.82 0 2.12-.85 3.52-.85.95 0 3.3.4 4.58 2.22-3.15 1.58-2.65 5.85.3 7.08-.72 2.22-1.68 4.2-2.58 5.15h.24zm-1.88-14.78c-.28-3.05 2.12-5.55 4.88-5.5 0 2.58-2.45 5.18-4.88 5.5z"/></svg>
            </span>
            <span class="text-[0.88rem] font-bold">Apple Pay</span>
          </div>
          <div class="h-5 w-5 rounded-full border-[1.5px] {selectedMethod === 'apple' ? 'border-ink bg-ink' : 'border-black/10'}"></div>
        </button>

        <!-- Credit Card -->
        <button
          type="button"
          on:click={() => selectedMethod = 'card'}
          class="flex w-full items-center justify-between rounded-[1.2rem] border px-4 py-3.5 transition-all {selectedMethod === 'card' ? 'border-ink bg-ink/5' : 'border-black/10 bg-white'}"
        >
          <div class="flex items-center gap-3">
            <span class="grid h-8 w-8 place-items-center rounded-lg border border-black/5 bg-gray-50/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            </span>
            <span class="text-[0.88rem] font-bold">Credit Card</span>
          </div>
          <div class="h-5 w-5 rounded-full border-[1.5px] {selectedMethod === 'card' ? 'border-ink bg-ink' : 'border-black/10'}"></div>
        </button>

        <!-- MiniPay Wallet -->
        <button
          type="button"
          on:click={() => selectedMethod = 'minipay'}
          class="flex w-full items-center justify-between rounded-[1.2rem] border px-4 py-3.5 transition-all {selectedMethod === 'minipay' ? 'border-[#cdb4ff] bg-[#ebd5f7]' : 'border-black/10 bg-white'}"
        >
          <div class="flex items-center gap-3">
            <span class="grid h-8 w-8 place-items-center rounded-full bg-black text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </span>
            <span class="text-[0.88rem] font-extrabold">MiniPay Wallet</span>
          </div>
          <div class="flex h-5 w-5 items-center justify-center rounded-full {selectedMethod === 'minipay' ? 'bg-black' : 'border-[1.5px] border-black/10'}">
            {#if selectedMethod === 'minipay'}
              <div class="h-2 w-2 rounded-full bg-white"></div>
            {/if}
          </div>
        </button>

        <!-- Crypto Wallet -->
        <button
          type="button"
          on:click={() => selectedMethod = 'crypto'}
          class="flex w-full items-center justify-between rounded-[1.2rem] border px-4 py-3.5 transition-all {selectedMethod === 'crypto' ? 'border-ink bg-ink/5' : 'border-black/10 bg-white'}"
        >
          <div class="flex items-center gap-3">
            <span class="grid h-8 w-8 place-items-center rounded-lg border border-black/5 bg-gray-50/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
            </span>
            <span class="text-[0.88rem] font-bold">Other Crypto Wallet</span>
          </div>
          <div class="h-5 w-5 rounded-full border-[1.5px] {selectedMethod === 'crypto' ? 'border-ink bg-ink' : 'border-black/10'}"></div>
        </button>
      </div>
    </section>

    <div class="mt-12 px-2 pb-8">
      <a href="/qr/kuro-exe" class="block w-full text-center rounded-[1.8rem] bg-[#d2f371] py-[1.15rem] text-[1.05rem] font-extrabold uppercase tracking-[0.05em] text-ink hover:bg-[#c4ec50] shadow-[0_12px_24px_rgba(210,243,113,0.25)]">
        Pay
      </a>
    </div>
  </section>
</main>
