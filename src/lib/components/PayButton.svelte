<script lang="ts">
  export let disabled = false;
  export let loading = false;
  export let onClick: () => void;
</script>

<button
  type="button"
  class="inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-5 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(17,17,17,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(17,17,17,0.2)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-45"
  disabled={disabled || loading}
  on:click={onClick}
>
  <span class="h-2.5 w-2.5 rounded-full bg-lime"></span>
  <span>{loading ? 'Opening MiniPay...' : 'Pay with MiniPay'}</span>
</button>
