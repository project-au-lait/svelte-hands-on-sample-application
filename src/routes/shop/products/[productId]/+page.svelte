<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { productClient } from '$lib/domain/product/ProductClient';
  import ProductForm from '$lib/domain/product/ProductForm.svelte';
  import type ProductModel from '$lib/domain/product/ProductModel';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let product = $state<ProductModel>(data.product);

  function update() {
    return productClient.update(fetch, product);
  }

  async function afterSubmit(productId: number) {
    await invalidateAll();
  }
</script>

<ProductForm bind:product onSubmit={update} {afterSubmit} />
