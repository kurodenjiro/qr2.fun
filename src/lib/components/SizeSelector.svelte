<script lang="ts">
  export let sizes: string[] = [];
  export let selected = '';
</script>

<div class="flex flex-wrap gap-2">
  {#each sizes as size}
    <button
      class={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        selected === size
          ? 'border-lilac bg-[#f4ebff] text-ink'
          : 'border-black/7 bg-white text-black/64 hover:border-black/14'
      }`}
      type="button"
    >
      {size}
    </button>
  {/each}
</div>
