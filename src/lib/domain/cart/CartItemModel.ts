import type ProductModel from '../product/ProductModel';

export default interface CartItemModel {
  product: ProductModel;
  quantity: number;
  subtotalPrice: number;
}
