import { Food } from '../food.model';

export type FoodsOutput = {
  payload: (typeof Food.schema.obj)[];
};
