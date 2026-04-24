<script lang="ts">
  export let colors: string[] = [];
  export let selected = 0;
</script>

<div class="flex items-center gap-3">
  {#each colors as color, index}
    <button
      aria-label={`Choose color ${index + 1}`}
      class={`h-7 w-7 rounded-full border transition-transform ${
        selected === index ? 'border-black scale-110 shadow-[0_0_0_3px_rgba(0,0,0,0.04)]' : 'border-black/6'
      }`}
      style={`background:${color}`}
      type="button"
    ></button>
  {/each}
</div>
