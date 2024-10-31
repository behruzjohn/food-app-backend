import { Food } from '../food.model';

export type FoodOutput = {
  payload: typeof Food.schema.obj;
};
