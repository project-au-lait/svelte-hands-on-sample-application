<script lang="ts">
  import cartStore from '$lib/domain/cart/CartStore';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const product = data.product;
</script>

<article class="container product-detail">
  <h1>{product.name}</h1>

  {#if product.imageUrl}
    <img src={product.imageUrl} alt={product.name} width="300" />
  {/if}

  <p><strong>価格: ¥{product.price.toLocaleString()}</strong></p>
  <p>{product.description}</p>

  <footer>
    <button onclick={async () => await cartStore.add(product)}>カートに入れる</button>
  </footer>
</article>

<style>
  .product-detail {
    max-width: 600px;
    padding: 2rem;
  }

  .product-detail img {
    display: block;
    margin: 0 auto 1rem auto;
    border-radius: 8px;
  }
</style>
