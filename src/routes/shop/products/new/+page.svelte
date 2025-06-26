<script lang="ts">
  import { goto } from '$app/navigation';
  import { productClient } from '$lib/domain/product/ProductClient';
  import ProductForm from '$lib/domain/product/ProductForm.svelte';
  import type ProductModel from '$lib/domain/product/ProductModel';

  let product = $state({} as ProductModel);

  function create() {
    return productClient.create(fetch, product);
  }

  async function afterSubmit(productId: number) {
    await goto(`../${productId}`);
  }
</script>

<ProductForm bind:product onSubmit={create} {afterSubmit} />
