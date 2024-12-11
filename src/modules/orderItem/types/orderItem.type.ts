import { Types } from 'mongoose';

export type OrderItemSchema = {
  food: typeof Types.ObjectId | Types.ObjectId;
  user: typeof Types.ObjectId | Types.ObjectId;
  price: number;
  quantity: number;
  order: typeof Types.ObjectId | Types.ObjectId;
};
