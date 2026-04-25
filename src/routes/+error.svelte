<script lang="ts">
  import { page } from '$app/stores';
  import BottomNav from '$lib/components/BottomNav.svelte';
</script>

<svelte:head>
  <title>{$page.status} | Ethereal</title>
</svelte:head>

<main class="min-h-screen bg-[#fafafb] px-5 pt-12 pb-32">
  <div class="phone-shell relative overflow-hidden flex flex-col items-center justify-center text-center py-20 min-h-[75vh]">
    <!-- Abstract background elements -->
    <div class="absolute -top-20 -right-20 w-80 h-80 bg-[#ebd5f7] rounded-full blur-[100px] opacity-40"></div>
    <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-[#a7ebd6] rounded-full blur-[100px] opacity-40"></div>

    <div class="relative z-10 flex flex-col items-center">
      <div class="mb-12 flex flex-col items-center gap-3">
        <img src="/logo.png" alt="Ethereal Logo" class="h-16 w-16 object-contain drop-shadow-md" />
        <div class="flex items-center gap-2 opacity-50">
          <span class="text-[0.6rem] mt-0.5">✦</span>
          <p class="font-display text-[0.75rem] font-bold uppercase tracking-[0.25em] text-ink">Ethereal</p>
        </div>
      </div>

      <div class="relative">
        <h1 class="font-display text-[8rem] font-black leading-none tracking-tighter text-ink/5 absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          {$page.status}
        </h1>
        
        <div class="relative z-20 space-y-5 px-4 pt-4">
          <h2 class="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink uppercase">
            { $page.status === 404 ? 'Looks Like\nYou\'re Lost' : 'Something\nGone Wrong' }
          </h2>
          
          <p class="text-[0.82rem] font-medium text-ink/50 max-w-[260px] mx-auto leading-relaxed uppercase tracking-tighter">
            The page you are looking for has faded into the ether.
          </p>
        </div>
      </div>

      <div class="mt-16 flex flex-col items-center gap-6 w-full">
        <a 
          href="/" 
          class="inline-flex h-[3.8rem] w-[14rem] items-center justify-center rounded-full bg-ink text-white text-[0.85rem] font-black uppercase tracking-[0.12em] shadow-[0_16px_32px_rgba(17,17,17,0.2)] transition-all active:scale-95"
        >
          Return to Home
        </a>
        
        <a 
          href="/search" 
          class="text-[0.75rem] font-black uppercase tracking-[0.18em] text-ink/40 hover:text-ink transition-colors border-b border-ink/10 pb-0.5"
        >
          Browse Collections
        </a>
      </div>
    </div>
  </div>

  <BottomNav current="" />
</main>

<style>
  :global(body) {
    background-color: #fafafb;
  }
</style>
