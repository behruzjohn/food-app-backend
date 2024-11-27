import { Types } from 'mongoose';

export type UpdateCartFoodQuantityProps = {
  cartItemId: Types.ObjectId;
  quantity: number;
};
