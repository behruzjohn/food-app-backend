import { Types } from 'mongoose';

export type CartItemInput = {
  food: Types.ObjectId;
  quantity: number;
};
