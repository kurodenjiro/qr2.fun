<script lang="ts">
  import { fly } from 'svelte/transition';

  type Tone = 'lime' | 'lavender' | 'coral' | 'ink';

  export let text: string;
  export let tone: Tone = 'lime';
  export let className = '';

  const tones: Record<Tone, string> = {
    lime: 'bg-lime text-ink',
    lavender: 'bg-lavender text-ink',
    coral: 'bg-coral text-ink',
    ink: 'bg-ink text-white'
  };
</script>

<div
  class={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.24em] shadow-[0_10px_24px_rgba(17,17,17,0.12)] ${tones[tone]} ${className}`}
  in:fly={{ y: 12, duration: 320 }}
>
  <span class="h-2 w-2 rounded-full bg-current opacity-60"></span>
  <span>{text}</span>
</div>
