<script lang="ts">
  export let href: string | undefined = undefined;
  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  export let full = false;
  export let disabled = false;
  export let type: 'button' | 'submit' = 'button';
  export let onClick: (() => void) | undefined = undefined;

  const classes = {
    primary:
      'bg-ink text-white shadow-[0_14px_32px_rgba(17,17,17,0.18)] hover:-translate-y-0.5',
    secondary:
      'bg-lime text-ink shadow-[0_14px_32px_rgba(198,242,109,0.28)] hover:-translate-y-0.5',
    ghost: 'bg-white/70 text-ink border border-black/8 hover:bg-white'
  };
</script>

{#if href}
  <a
    class={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors transition-shadow transition-transform duration-200 active:scale-[0.97] ${classes[variant]} ${full ? 'w-full' : ''} ${disabled ? 'pointer-events-none opacity-50' : ''}`}
    href={href}
  >
    <slot />
  </a>
{:else}
  <button
    class={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors transition-shadow transition-transform duration-200 active:scale-[0.97] ${classes[variant]} ${full ? 'w-full' : ''} ${disabled ? 'pointer-events-none opacity-50' : ''}`}
    {type}
    on:click={onClick}
  >
    <slot />
  </button>
{/if}
