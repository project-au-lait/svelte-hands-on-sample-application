<script lang="ts">
  import cartStore from '$lib/domain/cart/CartStore';
</script>

<section>
  <h1>ショッピングカート</h1>
  {#if $cartStore.totalQuantity === 0}
    <p>カートに商品がありません。</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>商品画像</th>
          <th>商品名</th>
          <th>価格</th>
          <th>数量</th>
          <th>小計</th>
        </tr>
      </thead>
      <tbody>
        {#each $cartStore.items as item}
          <tr>
            <td>
              {#if item.product.imageUrl}
                <img src={item.product.imageUrl} alt={item.product.name} width="60" />
              {/if}
            </td>
            <td>{item.product.name}</td>
            <td>¥{item.product.price.toLocaleString()}</td>
            <td
              >{item.quantity}
              <button
                class="small outline"
                onclick={async () => await cartStore.remove(item.product)}>-</button
              >
              <button class="small outline" onclick={async () => await cartStore.add(item.product)}
                >+</button
              >
            </td>
            <td>¥{item.subtotalPrice.toLocaleString()}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" style="text-align:right;"><strong>合計</strong></td>
          <td>
            <strong>
              ¥{$cartStore.totalPrice.toLocaleString()}
            </strong>
          </td>
        </tr>
      </tfoot>
    </table>
    <div>
      <a href="/checkout">レジに進む</a>
    </div>
  {/if}
</section>

<style>
  button.small {
    padding: 0.25em 0.5em;
  }
</style>
