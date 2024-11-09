import Category from '../category.model';

export type CreateCategoryProps = {
  category: typeof Category.schema.obj;
};
