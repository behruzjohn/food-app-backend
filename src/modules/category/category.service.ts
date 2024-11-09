import { BadRequestError } from 'src/common';
import Category from './category.model';
import { CreateCategoryProps } from './props/createCategoryProps';
import { GetCategoryByIdProps } from './props/getCategoryProps';
import { UpdateCategoryProps } from './props/updateCategoryProps';
import { CategoryOutput } from './outputs/category.output';
import { CategoriesOutput } from './outputs/categories.output';

export const createCategory = async ({
  category,
}: CreateCategoryProps): Promise<CategoryOutput> => {
  const createdCategory = await Category.create(category);
  if (!createdCategory) {
    throw new BadRequestError('Error during creating category!');
  }
  return { payload: createdCategory };
};

export const getAllCategories = async (): Promise<CategoriesOutput> => {
  const foundCategory = await Category.find();

  return { payload: foundCategory };
};

export const getCategoryById = async ({
  categoryId,
}: GetCategoryByIdProps): Promise<CategoryOutput> => {
  const foundCategory = await Category.findById(categoryId);

  if (!foundCategory) {
    throw new BadRequestError('Category not found!');
  }

  return { payload: foundCategory };
};

export const updateCategoryById = async ({
  categoryId,
  category,
}: UpdateCategoryProps): Promise<CategoryOutput> => {
  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    category,
    { new: true },
  );

  if (!updatedCategory) {
    throw new BadRequestError('Category not found!');
  }

  return { payload: updatedCategory };
};

export const deleteCategoryById = async ({
  categoryId,
}: GetCategoryByIdProps): Promise<CategoryOutput> => {
  const foundCategory = await Category.findByIdAndDelete(categoryId);

  if (!foundCategory) {
    throw new BadRequestError('Category not found!');
  }

  return { payload: foundCategory };
};
