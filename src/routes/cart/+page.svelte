<script lang="ts">
  import BottomNav from "$lib/components/BottomNav.svelte";
  import { cart } from "$lib/cart";
  import { fly, fade } from "svelte/transition";
  
  $: subtotal = $cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  $: tax = subtotal * 0.08;
  $: total = subtotal + tax;

  let isCheckingOut = false;

  async function handleCheckout() {
    if ($cart.length === 0) return;
    isCheckingOut = true;

    try {
      // We'll call a server action or API to get the Shopify checkout URL
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: $cart.map(item => ({
            handle: item.product.id,
            quantity: item.quantity
          }))
        })
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        alert('Checkout currently unavailable. Please try again.');
      }
    } catch (e) {
      console.error(e);
      alert('Error initiating checkout.');
    } finally {
      isCheckingOut = false;
    }
  }
</script>

<svelte:head>
  <title>Cart | Ethereal</title>
</svelte:head>

<main class="min-h-screen bg-[#fafafb] px-5 pb-36 pt-8">
  <div class="phone-shell relative">
    <header class="flex items-center justify-between">
      <h1 class="font-display text-[2.2rem] font-bold tracking-tight text-ink">Bag</h1>
      <span class="rounded-full bg-ink px-3 py-1 text-[0.7rem] font-bold text-white">
        {$cart.length} ITEMS
      </span>
    </header>

    {#if $cart.length === 0}
      <div class="flex flex-col items-center justify-center py-20 text-center" in:fade>
        <div class="mb-6 rounded-full bg-ink/5 p-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-ink/20"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <p class="text-[0.9rem] font-medium text-ink/40">Your bag is currently empty.</p>
        <a href="/search" class="mt-6 text-[0.75rem] font-bold uppercase tracking-wider text-ink underline underline-offset-4">Browse Collection</a>
      </div>
    {:else}
      <div class="mt-8 space-y-6">
        {#each $cart as item, index (item.product.id)}
          <div 
            class="flex gap-4 border-b border-black/5 pb-6"
            in:fly={{ y: 20, delay: index * 50 }}
          >
            <div class="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white p-2 border border-black/5">
              <img src={item.product.image} alt={item.product.name} class="h-full w-full object-contain mix-blend-multiply" />
            </div>
            
            <div class="flex flex-1 flex-col justify-between py-1">
              <div>
                <div class="flex items-start justify-between">
                  <h3 class="text-[0.9rem] font-bold text-ink">{item.product.name}</h3>
                  <button on:click={() => cart.removeItem(item.product.id)} class="text-ink/30 hover:text-ink transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
                <p class="mt-0.5 text-[0.75rem] font-medium text-ink/50 uppercase tracking-tight">{item.product.category}</p>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <button on:click={() => cart.updateQuantity(item.product.id, item.quantity - 1)} class="grid h-6 w-6 place-items-center rounded-full border border-black/10 text-ink/40 hover:border-ink/20 hover:text-ink">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                  </button>
                  <span class="text-[0.8rem] font-black tabular-nums">{item.quantity}</span>
                  <button on:click={() => cart.updateQuantity(item.product.id, item.quantity + 1)} class="grid h-6 w-6 place-items-center rounded-full border border-black/10 text-ink/40 hover:border-ink/20 hover:text-ink">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </button>
                </div>
                <p class="text-[0.95rem] font-black text-ink">${Math.round(item.product.price * item.quantity)}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="mt-12 space-y-4">
        <div class="flex items-center justify-between text-[0.8rem] font-medium text-ink/60">
          <span>Subtotal</span>
          <span class="text-ink font-bold tabular-nums">${Math.round(subtotal)}</span>
        </div>
        <div class="flex items-center justify-between text-[0.8rem] font-medium text-ink/60">
          <span>Tax (8%)</span>
          <span class="text-ink font-bold tabular-nums">${Math.round(tax)}</span>
        </div>
        <div class="border-t border-black/10 pt-4 flex items-center justify-between">
          <span class="text-[0.9rem] font-black uppercase tracking-wider">Total</span>
          <span class="text-[1.2rem] font-black tabular-nums">${Math.round(total)}</span>
        </div>
      </div>

      <div class="fixed bottom-[6.5rem] inset-x-5 max-w-phone mx-auto">
        <button 
          on:click={handleCheckout}
          disabled={isCheckingOut}
          class="relative w-full h-[3.8rem] bg-[#111111] rounded-full text-white flex items-center justify-center gap-3 overflow-hidden shadow-[0_16px_36px_rgba(17,17,17,0.25)] transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {#if isCheckingOut}
            <div class="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span class="text-[0.85rem] font-black uppercase tracking-[0.1em]">Processing...</span>
          {:else}
            <span class="text-[0.85rem] font-black uppercase tracking-[0.1em]">Checkout</span>
            <div class="absolute right-2 h-11 w-11 rounded-full bg-white/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          {/if}
        </button>
      </div>
    {/if}
  </div>

  <BottomNav current="cart" />
</main>
