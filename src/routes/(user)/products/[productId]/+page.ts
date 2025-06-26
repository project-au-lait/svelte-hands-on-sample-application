import type { PageLoad } from './$types';
import { productClient } from '$lib/domain/product/ProductClient';
import type ProductModel from '$lib/domain/product/ProductModel';

export const load: PageLoad = async ({ fetch, params }) => {
  const product = (await productClient.get(fetch, params.productId)) || ({} as ProductModel);
  return { product };
};
