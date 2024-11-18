import { BadRequestError, BadUserInputError, GraphQLError } from 'src/common';
import { POPULATIONS } from 'src/constants/populations';
import { saveFile } from 'src/helpers/file';
import { Paginated } from 'src/types/pagenated';
import Category from '../category/category.model';
import { Food } from './food.model';
import { FoodOutput } from './outputs/food.output';
import { FoodsOutput } from './outputs/foods.output';
import { CreateFoodProps } from './props/createFood.props';
import { GetAllFoodsProps } from './props/getAllFoods.props';
import { GetFoodByIdProps } from './props/getFood.props';
import { GetFoodsByCategoryProps } from './props/getFoodsByCategory.props';
import { UpdateFoodProps } from './props/updateFood.props';

export const createFood = async ({
  image,
  food,
}: CreateFoodProps): Promise<FoodOutput> => {
  let imagePath: string;

  if (image) {
    imagePath = await saveFile(image);
  }

  const createdFood = await Food.create({
    ...food,
    image: imagePath,
  });

  if (!createdFood) {
    throw new BadRequestError('Something went wrong!');
  }

  return { payload: createdFood };
};

export const updateFoodById = async ({
  foodId,
  food,
}: UpdateFoodProps): Promise<FoodOutput> => {
  const updatedFood = await Food.findOneAndUpdate({ _id: foodId }, food, {
    new: true,
  });

  if (!updatedFood) {
    throw new GraphQLError('Food not found', 'BAD_REQUEST');
  }

  return { payload: updatedFood };
};

export const getFoodById = async ({
  foodId,
}: GetFoodByIdProps): Promise<FoodOutput> => {
  const foundFood = await Food.findById(foodId);

  if (!foundFood) {
    throw new BadRequestError('Food not found');
  }

  return { payload: foundFood };
};

export const deleteFoodById = async ({
  foodId,
}: GetFoodByIdProps): Promise<FoodOutput> => {
  const deletedFood = await Food.findByIdAndDelete(foodId);

  if (!deletedFood) {
    throw new BadUserInputError('Food not found!');
  }

  return { payload: deletedFood };
};

export const getAllFoods = async ({
  name,
  category,
  limit,
  page = 1,
}: GetAllFoodsProps): Promise<Paginated<FoodsOutput>> => {
  let categoryIds = [];
  const nameRegex = name ? new RegExp(name, 'i') : null;

  if (category) {
    const matchedCategory = await Category.find({
      name: { $regex: new RegExp(category, 'i') },
    });
    categoryIds = matchedCategory.map((category) => category._id);
  }

  const searchConditions = [];

  if (nameRegex) {
    searchConditions.push(
      { shortName: { $regex: nameRegex } },
      { name: { $regex: nameRegex } },
    );
  }
  if (categoryIds.length) {
    searchConditions.push({ category: { $in: categoryIds } });
  }

  const { docs: foundFoods, ...pagination } = await Food.find(
    searchConditions.length ? { $or: searchConditions } : {},
  )
    .populate(POPULATIONS.food)
    .paginate({ limit, page });

  return { payload: foundFoods, ...pagination };
};
