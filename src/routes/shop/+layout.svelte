<script lang="ts">
  import MessagePanel from '$lib/arch/MessagePanel.svelte';
  import '@picocss/pico';

  let { children } = $props();
</script>

<nav class="container">
  <ul>
    <li><strong>WORKSHOP SHOP for SHOP</strong></li>
  </ul>
  <ul>
    <li>
      <a href="/shop/">店舗管理トップ</a>
    </li>
    <li>
      <a href="/shop/products">商品管理</a>
    </li>
    <li>
      <a href="/">店舗トップ</a>
    </li>
  </ul>
</nav>

<MessagePanel />

<main class="container">
  {@render children()}
</main>

<style lang="scss">
  :global(:root) {
    --pico-font-size: small;
  }

  nav,
  main {
    max-width: 800px;
  }
</style>
