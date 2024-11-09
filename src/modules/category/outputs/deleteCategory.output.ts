import Categories from '../category.model';

export type DeleteCategoryOutput = {
  payload: typeof Categories.schema.obj;
};
