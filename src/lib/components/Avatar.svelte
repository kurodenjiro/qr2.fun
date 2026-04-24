<script lang="ts">
  export let letter = 'K';
  export let image = '/logo.png';
  export let size: 'sm' | 'md' | 'lg' = 'lg';

  const sizes = {
    sm: 'h-12 w-12 text-xl',
    md: 'h-16 w-16 text-2xl',
    lg: 'h-24 w-24 text-4xl'
  };
</script>

<div class={`soft-ring relative grid place-items-center rounded-full bg-lavender/65 text-ink ${sizes[size]}`}>
  <span class="font-display leading-none">{letter}</span>
  <img
    alt="Avatar accent"
    class="absolute -bottom-1 -right-1 h-8 w-8 rounded-full border border-white/70 bg-white p-1 object-cover"
    height="32"
    src={image}
    width="32"
  />
</div>
