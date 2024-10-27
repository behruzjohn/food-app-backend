import { Food } from '../food.model';

export type CreateOrderOutput = {
  payload: typeof Food.schema.obj;
};
