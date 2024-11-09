import Categories from '../category.model';

export type CreateCategoryProps = {
  category: typeof Categories.schema.obj;
};
