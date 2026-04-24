<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  const methods = ['Apple Pay', 'Credit Card', 'MiniPay Wallet', 'Other Crypto Wallet'];
</script>

<svelte:head>
  <title>Checkout | Ethereal</title>
</svelte:head>

<main class="px-4 pb-16 pt-4">
  <section class="phone-shell px-4 pb-8 pt-4">
    <div class="topbar">
      <a aria-label="Back to cart" class="topbar-action" href="/cart">←</a>
      <p class="screen-title">Checkout</p>
      <div class="topbar-action text-sm"> </div>
    </div>

    <section class="mt-7">
      <div class="flex items-center justify-between">
        <p class="text-[0.72rem] font-extrabold uppercase tracking-[0.05em] text-black/66">Shipping Address</p>
        <a class="text-[0.72rem] font-medium text-black/46" href="/cart">Change</a>
      </div>
      <div class="mt-4 space-y-1 text-[0.92rem] leading-6 text-black/72">
        <p class="font-semibold text-ink">Jane Cooper</p>
        <p>+1 212-555-0188</p>
        <p>123 Fashion St.</p>
        <p>New York, NY 10001</p>
      </div>
    </section>

    <div class="mt-6 h-px bg-black/8"></div>

    <section class="mt-6">
      <p class="text-[0.72rem] font-extrabold uppercase tracking-[0.05em] text-black/66">Payment Method</p>
      <div class="mt-4 space-y-3">
        {#each methods as method, index}
          <label class={`flex items-center justify-between rounded-full border px-4 py-3.5 text-sm font-semibold ${
            index === 2
              ? 'border-lilac/70 bg-[#eedfff] text-ink'
              : 'border-black/7 bg-white text-black/74'
          }`}>
            <span>{method}</span>
            <input checked={index === 2} class="h-4 w-4 accent-black" name="payment_method" type="radio" />
          </label>
        {/each}
      </div>
    </section>

    <div class="mt-8">
      <Button href="/qr/kuro-exe" variant="secondary" full={true}>Pay $587</Button>
    </div>
  </section>
</main>
