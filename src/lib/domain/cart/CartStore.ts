import { get, writable } from 'svelte/store';
import type ProductModel from '../product/ProductModel';
import messageStore from '$lib/arch/MessageStore';
import type CartModel from './CartModel';
import cartClient from './CartClient';
import type CartItemModel from './CartItemModel';

class CartStore {
  private readonly CART_ID_KEY = 'cartId';
  private writable = writable({ items: [] as CartItemModel[] } as CartModel);
  private set = this.writable.set;
  subscribe = this.writable.subscribe;

  async add(product: ProductModel) {
    const cart = get(this.writable);
    this.addToCart(cart, product);

    const responseCart = await cartClient.createOrUpdate(fetch, cart);

    if (!cart.id && responseCart && responseCart.id) {
      localStorage.setItem(this.CART_ID_KEY, responseCart.id.toString());
      cart.id = responseCart.id;
    }

    this.set(cart);

    messageStore.show(`${product.name}をカートに追加しました。`);
  }

  async remove(product: ProductModel) {
    const cart = get(this.writable);
    this.removeFromCart(cart, product);

    if (cart.items.length === 0) {
      localStorage.removeItem(this.CART_ID_KEY);
      await cartClient.delete(fetch, cart.id!);
      cart.id = undefined; // Clear cart ID if empty
    } else {
      await cartClient.update(fetch, cart);
    }

    this.set(cart);

    messageStore.show(`${product.name}をカートから削除しました。`);
  }

  private addToCart(cart: CartModel, product: ProductModel) {
    const existingItem = cart.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product, quantity: 1, subtotalPrice: product.price });
    }

    this.calculate(cart, existingItem);
  }

  private removeFromCart(cart: CartModel, product: ProductModel) {
    const existingItem = cart.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        cart.items = cart.items.filter((item) => item.product.id !== product.id);
      }
    }

    this.calculate(cart, existingItem);
  }

  private calculate(cart: CartModel, item?: CartItemModel) {
    if (item) {
      item.subtotalPrice = item.product.price * item.quantity;
    }
    cart.totalPrice = cart.items.reduce((total, item) => total + item.subtotalPrice, 0);
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  async load(fetch: Fetch) {
    const cartId = localStorage.getItem(this.CART_ID_KEY);
    if (cartId) {
      const cart = await cartClient.get(fetch, cartId);
      if (cart) {
        this.set(cart);
      }
    }
  }
}

const cartStore = new CartStore();
export default cartStore;
