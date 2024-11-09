import Category from '../category.model';

export type CategoryOutput = {
  payload: typeof Category.schema.obj;
};
