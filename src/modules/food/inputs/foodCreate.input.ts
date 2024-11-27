import { Types } from 'mongoose';

export interface FoodInput {
  shortName: string;
  name: string;
  description?: string;
  price: number;
  discount: number;
  category: Types.ObjectId;
}
