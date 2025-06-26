<script lang="ts">
    import type ProductModel from '$lib/domain/product/ProductModel';
  import type { PageProps } from '../../shop/products/$types';

  let { data }: PageProps = $props();
  const products: ProductModel[] = data.products;
</script>

<section>
  <a href="new"> 新規商品登録</a>
</section>

<section>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>商品名</th>
        <th>価格</th>
        <th>説明</th>
      </tr>
    </thead>
    <tbody>
      {#each products as product}
        <tr>
          <td><a href={`${product.id}`}>{product.id}</a></td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
