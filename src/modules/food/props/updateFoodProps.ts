import { Types } from 'mongoose';
import { FoodUpdateInput } from '../inputs/foodUpdate.input';

export type UpdateFoodProps = {
  foodId: Types.ObjectId;
  food: FoodUpdateInput;
};
