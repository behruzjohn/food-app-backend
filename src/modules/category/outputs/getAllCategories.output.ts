import Category from '../category.model';

export type CreateCategoryOutput = {
  payload: (typeof Category.schema.obj)[];
};
