import type CartItemModel from './CartItemModel';

export default interface CartModel {
  id?: string;
  items: CartItemModel[];
  totalPrice: number;
  totalQuantity: number;
}
