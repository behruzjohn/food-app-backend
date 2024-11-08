import Categories from '../category.model';

export type CreateCategoriesOutput = {
  payload: (typeof Categories.schema.obj)[];
};
