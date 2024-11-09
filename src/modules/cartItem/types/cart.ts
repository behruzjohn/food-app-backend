import { CartItem } from '../cartItem.model';

export type Cart = {
  items: (typeof CartItem.schema.obj)[];
  totalPrice: number;
};
