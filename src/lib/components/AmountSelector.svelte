<script lang="ts">
  import type { AmountOption } from '$lib/types';

  export let options: AmountOption[] = [];
  export let selected: number | 'custom' = 10000;
  export let customValue = '';
  export let onSelect: (value: number | 'custom') => void;
  export let onCustomValueChange: (value: string) => void;

  function handleInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    onCustomValueChange(target.value);
  }
</script>

<div class="space-y-3">
  <div class="flex flex-wrap gap-2">
    {#each options as option}
      <button
        type="button"
        class={`rounded-full px-4 py-3 text-sm font-semibold transition-colors transition-shadow transition-transform duration-200 active:scale-[0.97] ${
          selected === option.value
            ? 'bg-lime text-ink shadow-[0_14px_28px_rgba(198,242,109,0.35)]'
            : 'bg-black/5 text-black/70 hover:bg-black/8'
        }`}
        on:click={() => onSelect(option.value)}
      >
        {option.label}
      </button>
    {/each}
  </div>

  {#if selected === 'custom'}
    <label class="block">
      <span class="mb-2 block text-[11px] font-semibold uppercase tracking-[0.28em] text-black/42">
        Custom amount
      </span>
      <input
        class="w-full rounded-[22px] border border-black/8 bg-white/80 px-4 py-3 text-base font-semibold text-ink transition duration-200 placeholder:text-black/28 focus:border-black/18 focus:shadow-[0_0_0_4px_rgba(198,242,109,0.35)]"
        inputmode="numeric"
        min="0"
        on:input={handleInput}
        placeholder="Enter VND amount"
        type="number"
        name="custom_amount_vnd"
        autocomplete="off"
        spellcheck="false"
        value={customValue}
      />
    </label>
  {/if}
</div>
