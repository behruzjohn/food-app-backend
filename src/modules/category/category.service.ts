import { BadRequestError } from 'src/common';
import Category from './category.model';
import { CartItemOutput } from './outputs/createCategory.output';
import { DeleteCategoryOutput } from './outputs/deleteCategory.output';
import { CreateCategoryOutput } from './outputs/getAllCategory.output';
import { UpdateCategoryOutput } from './outputs/updateCategory.output';
import { CreateCategoryProps } from './props/createCategoryProps';
import { GetCategoryByIdProps } from './props/getCategoryProps';
import { UpdateCategoryProps } from './props/updateCategoryProps';

export const createCategory = async ({
  category,
}: CreateCategoryProps): Promise<CartItemOutput> => {
  const createdCategory = await Category.create(category);
  if (!createdCategory) {
    throw new BadRequestError('Error during creating category!');
  }
  return { payload: createdCategory };
};

export const getAllCategory = async (): Promise<CreateCategoryOutput> => {
  const foundCategory = await Category.find();

  return { payload: foundCategory };
};

export const getCategoryById = async ({
  categoryId,
}: GetCategoryByIdProps): Promise<CartItemOutput> => {
  const foundCategory = await Category.findById(categoryId);

  if (!foundCategory) {
    throw new BadRequestError('Category not found!');
  }

  return { payload: foundCategory };
};

export const updateCategoryById = async ({
  categoryId,
  category,
}: UpdateCategoryProps): Promise<UpdateCategoryOutput> => {
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
}: GetCategoryByIdProps): Promise<DeleteCategoryOutput> => {
  const foundCategory = await Category.findByIdAndDelete(categoryId);
  if (!foundCategory) {
    throw new BadRequestError('Category not found!');
  }
  return { payload: foundCategory };
};
