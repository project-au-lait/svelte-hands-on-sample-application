import { restClient } from '$lib/arch/RestClient';
import type Product from './ProductModel';

class ProductClient {
  async get(fetch: Fetch, productId: string): Promise<Product | undefined> {
    return restClient.get<Product>(fetch, `products/${productId}`);
  }

  async search(fetch: Fetch): Promise<Product[] | undefined> {
    return restClient.get<Product[]>(fetch, `products`);
  }

  async create(fetch: Fetch, product: Product): Promise<Product | undefined> {
    return restClient.post<Product>(fetch, `products`, product);
  }

  async update(fetch: Fetch, product: Product): Promise<Product | undefined> {
    return restClient.put<Product>(fetch, `products/${product.id}`, product);
  }

  async delete(fetch: Fetch, productId: string): Promise<Product | undefined> {
    return restClient.delete<Product>(fetch, `products/${productId}`);
  }
}

export const productClient = new ProductClient();
