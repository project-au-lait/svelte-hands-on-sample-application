<script lang="ts">
  import MessagePanel from '$lib/arch/MessagePanel.svelte';
  import cartStore from '$lib/domain/cart/CartStore';
  import '@picocss/pico';
  import { Home, LogIn, Mail, ShoppingCart } from 'lucide-svelte';

  let { children } = $props();
</script>

<nav class="container">
  <ul>
    <li><strong>WORKSHOP SHOP</strong></li>
  </ul>
  <ul>
    <li>
      <a href="/" title="Top"><Home /></a>
    </li>
    <li>
      <a href="/cart/" title="Shopping Cart"
        ><ShoppingCart />
        {#if $cartStore.totalQuantity > 0}
          <span class="badge">{$cartStore.totalQuantity} </span>
        {/if}
      </a>
    </li>
    <li>
      <a href="." title="Contact Us"><Mail /></a>
    </li>
    <li>
      <a href="." title="Log In"><LogIn /></a>
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

  .badge {
    -moz-border-radius: 9px;
    -webkit-border-radius: 9px;
    background: #ff0000;
    border-radius: 9px;
    color: #fff;
    font-size: 12px;
    margin-left: -10px;
    padding-left: 9px;
    padding-right: 9px;
    padding: 0 5px;
    vertical-align: top;
  }
</style>
