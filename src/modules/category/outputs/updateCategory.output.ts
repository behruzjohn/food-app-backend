import Categories from '../category.model';

export type UpdateCategoryOutput = {
  payload: typeof Categories.schema.obj;
};
