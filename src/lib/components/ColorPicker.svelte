<script lang="ts">
  export let colors: string[] = [];
  export let selected = 0;
</script>

<div class="flex items-center gap-3">
  {#each colors as color, index}
    <button
      aria-label={`Choose color ${index + 1}`}
      class={`h-8 w-8 rounded-full border border-black/5 transition-transform ${selected === index ? 'scale-110' : ''}`}
      style={`background:${color}; ${selected === index ? `box-shadow: 0 0 0 3px white, 0 0 0 5px ${color}60` : ''}`}
      type="button"
    ></button>
  {/each}
</div>
