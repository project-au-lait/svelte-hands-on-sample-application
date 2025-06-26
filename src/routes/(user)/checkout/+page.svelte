<script lang="ts">
  import cartStore from '$lib/domain/cart/CartStore';
</script>

<h1>チェックアウト</h1>

<form class="container">
  <h2>合計金額: ¥{$cartStore.totalPrice.toLocaleString()}</h2>
  <label for="name">お名前:</label>
  <input id="name" name="name" type="text" required />

  <label for="address">住所:</label>
  <input id="address" name="address" type="text" required />

  <label for="payment">支払い方法:</label>
  <select id="payment" name="payment" required>
    <option value="">選択してください</option>
    <option value="credit">クレジットカード</option>
    <option value="bank">銀行振込</option>
    <option value="cod">代金引換</option>
  </select>
  <button type="submit">注文を確定する</button>
  <a href="/cart" style="margin-left: 1rem;">カートに戻る</a>
</form>

<style>
  form {
    max-width: 500px;
  }
</style>
