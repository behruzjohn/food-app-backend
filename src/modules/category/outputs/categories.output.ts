import Category from '../category.model';

export type CategoriesOutput = {
  payload: (typeof Category.schema.obj)[];
};
