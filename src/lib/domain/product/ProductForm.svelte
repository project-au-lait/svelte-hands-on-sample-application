<script lang="ts">
  import messageStore from '$lib/arch/MessageStore';
  import type ProductModel from './ProductModel';

  interface Props {
    product: ProductModel;
    onSubmit: () => Promise<ProductModel | undefined>;
    afterSubmit: (id: number) => Promise<void>;
  }

  let { product = $bindable(), onSubmit, afterSubmit }: Props = $props();

  async function handleSubmit() {
    const res = await onSubmit();

    if (res) {
      messageStore.show('保存しました。');

      await afterSubmit(res.id);
    }
  }
</script>

<section>
  <a href="../">戻る</a>
</section>

<form>
  <label>
    商品名:
    <input type="text" bind:value={product.name} />
  </label>
  <label>
    価格:
    <input type="number" bind:value={product.price} />
  </label>
  <label>
    説明:
    <textarea bind:value={product.description}></textarea>
  </label>
  <button type="submit" onclick={handleSubmit}>保存</button>
</form>
