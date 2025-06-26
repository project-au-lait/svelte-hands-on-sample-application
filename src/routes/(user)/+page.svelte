<script lang="ts">
  import cartStore from '$lib/domain/cart/CartStore';
  import type ProductModel from '$lib/domain/product/ProductModel';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const products: ProductModel[] = data.products;
</script>

<section>
  <fieldset role="search">
    <input type="search" />
    <input type="submit" value="Search" />
  </fieldset>
</section>

<section
  class="grid"
  style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;"
>
  {#each products as product}
    <article>
      <a href={`/products/${product.id}`} style="text-decoration: none; color: inherit;">
        <img src={product.imageUrl} alt={product.name} style="width:100%;" />
        <div>
          <h2>{product.name}</h2>
          <div>{product.description}</div>
          <div><strong>¥{product.price.toLocaleString()}</strong></div>
        </div>
      </a>
      <footer>
        <button onclick={async () => await cartStore.add(product)}>カートに入れる</button>
      </footer>
    </article>
  {/each}
</section>
