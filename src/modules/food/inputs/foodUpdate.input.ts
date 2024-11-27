import { Types } from 'mongoose';

export interface FoodUpdateInput {
  shortName?: string;
  name?: string;
  description?: string;
  price?: number;
  discount?: number;
  category?: Types.ObjectId;
}
