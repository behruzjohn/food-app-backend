import Category from '../category.model';

export type UpdateCategoryOutput = {
  payload: typeof Category.schema.obj;
};
