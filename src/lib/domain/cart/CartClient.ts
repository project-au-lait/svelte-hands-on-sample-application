import { restClient } from '$lib/arch/RestClient';
import type CartModel from './CartModel';

class CartClient {
  async create(fetch: Fetch, cart: CartModel): Promise<CartModel | undefined> {
    return await restClient.post<CartModel>(fetch, 'carts', cart);
  }

  async get(fetch: Fetch, cartId: string): Promise<CartModel | undefined> {
    return await restClient.get<CartModel>(fetch, `carts/${cartId}`);
  }

  async update(fetch: Fetch, cart: CartModel): Promise<CartModel | undefined> {
    return await restClient.put<CartModel>(fetch, `carts/${cart.id}`, cart);
  }

  async createOrUpdate(fetch: Fetch, cart: CartModel): Promise<CartModel | undefined> {
    if (cart.id) {
      return await this.update(fetch, cart);
    } else {
      return await this.create(fetch, cart);
    }
  }

  async delete(fetch: Fetch, cartId: string): Promise<void> {
    await restClient.delete(fetch, `carts/${cartId}`);
  }
}

const cartClient = new CartClient();
export default cartClient;
