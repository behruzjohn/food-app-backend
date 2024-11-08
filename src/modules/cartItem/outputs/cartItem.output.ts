import { CartItem } from '../cartItem.model';

export type CartItemOutput = {
  payload: typeof CartItem.schema.obj;
};
