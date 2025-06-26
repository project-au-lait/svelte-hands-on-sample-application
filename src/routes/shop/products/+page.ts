import { productClient } from '$lib/domain/product/ProductClient';
import type ProductModel from '$lib/domain/product/ProductModel';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const products = (await productClient.search(fetch)) || ([] as ProductModel[]);

  return {
    products
  };
};
