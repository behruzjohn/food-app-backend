import Category from '../category.model';

export type DeleteCategoryOutput = {
  payload: typeof Category.schema.obj;
};
