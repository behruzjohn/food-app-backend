import Category from '../category.model';

export type CartItemOutput = {
  payload: typeof Category.schema.obj;
};
