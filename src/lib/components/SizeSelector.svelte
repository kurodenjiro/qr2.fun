<script lang="ts">
  export let sizes: string[] = [];
  export let selected = '';
</script>

<div class="flex flex-wrap gap-2">
  {#each sizes as size}
    <button
      class={`grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full text-[0.75rem] font-bold transition-colors ${
        selected === size
          ? 'border-[#cdb4ff] text-ink ring-1 ring-[#cdb4ff]'
          : 'border border-black/10 bg-white text-ink hover:border-black/20'
      }`}
      type="button"
    >
      {size}
    </button>
  {/each}
</div>
