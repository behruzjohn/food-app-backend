import { Types } from 'mongoose';
import { FoodUpdateInput } from '../inputs/foodUpdate.input';

export type UpdateFoodProps = {
  id: Types.ObjectId;
  food: FoodUpdateInput;
};
