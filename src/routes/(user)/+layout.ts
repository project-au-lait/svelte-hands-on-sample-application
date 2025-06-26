import cartClient from '$lib/domain/cart/CartClient';
import cartStore from '$lib/domain/cart/CartStore';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
  await cartStore.load(fetch);
  return {};
};
