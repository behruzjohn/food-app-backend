import { CartItem } from "../cartItem.model";

export type CartItemsOutput = {
  payload: (typeof CartItem.schema.obj)[];
};
