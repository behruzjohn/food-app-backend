import { Types } from 'mongoose';

export type FoodSchema = {
  name: string;
  image: string;
  shortName: string;
  description: string;
  price: number;
  discount: number;
  category: typeof Types.ObjectId;
  likes: number;
  isFavorite?: boolean;
};
