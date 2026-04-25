<script lang="ts">
  export let current: "home" | "search" | "builder" | "wishlist" | "profile" =
    "home";

  const items = [
    {
      id: "home",
      label: "Home",
      href: "/",
      icon: "M4.75 10.75 12 4.75l7.25 6v7.5a1 1 0 0 1-1 1h-3.5v-5h-5.5v5H5.75a1 1 0 0 1-1-1z",
    },
    {
      id: "search",
      label: "Search",
      href: "/search",
      icon: "M11 18a7 7 0 1 1 4.95-2.05L20 20",
    },
    {
      id: "builder",
      label: "Generate",
      href: "/builder",
      icon: "M12 3.5 14.3 9.7 20.5 12 14.3 14.3 12 20.5 9.7 14.3 3.5 12 9.7 9.7z",
    },
    {
      id: "wishlist",
      label: "Wishlist",
      href: "/cart",
      icon: "M12 19.25 5.6 12.85a4.53 4.53 0 0 1 6.4-6.4L12 6.45l.01-.01a4.53 4.53 0 0 1 6.39 6.4z",
    },
    {
      id: "profile",
      label: "Profile",
      href: "/qr/kuro-exe",
      icon: "M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-6.5 8a6.5 6.5 0 0 1 13 0",
    },
  ] as const;
</script>

<nav
  class="fixed bottom-4 left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-[#0a0a0a]/96 px-4 py-3 text-white shadow-[0_24px_44px_rgba(0,0,0,0.22)] backdrop-blur-xl"
>
  {#each items as item}
    {#if item.id === "builder"}
      <a
        aria-label="AI Builder"
        class="relative flex min-w-[3.45rem] flex-col items-center justify-center px-1 -my-1"
        href={item.href}
      >
        <span
          class="grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full bg-[#c6f26d] text-ink"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linejoin="round"
            ><path
              d="M12 3l2.25 6.75L21 12l-6.75 2.25L12 21l-2.25-6.75L3 12l6.75-2.25L12 3z"
            /></svg
          >
        </span>
      </a>
    {:else}
      <a
        class={`flex min-w-[3.45rem] flex-col items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold transition-colors ${
          current === item.id
            ? "text-[#c6f26d]"
            : "text-white/60 hover:text-white"
        }`}
        href={item.href}
      >
        <svg
          aria-hidden="true"
          class="h-[1.35rem] w-[1.35rem]"
          fill={current === item.id ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width={current === item.id ? "0" : "1.8"}
        >
          <path d={item.icon} stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>{item.label}</span>
      </a>
    {/if}
  {/each}
</nav>
