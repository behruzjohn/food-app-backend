import { BadRequestError, BadUserInputError, GraphQLError } from 'src/common';
import { Food } from './food.model';
import { FoodOutput } from './outputs/food.output';
import { FoodsOutput } from './outputs/foods.output';
import { CreateFoodProps } from './props/createFoodProps';
import { GetFoodByIdProps } from './props/getFoodProps';
import { UpdateFoodProps } from './props/updateFoodProps';

export const createFood = async ({
  food,
}: CreateFoodProps): Promise<FoodOutput> => {
  const createdFood = await Food.create(food);

  if (!createdFood) {
    throw new BadRequestError('Something went wrong!');
  }

  return { payload: createdFood };
};

export const updateFoodById = async ({
  foodId,
  food,
}: UpdateFoodProps): Promise<FoodOutput> => {
  const updatedFood = await Food.findByIdAndUpdate(foodId, food, {
    new: true,
    runValidators: true,
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

export const getAllFoods = async (): Promise<FoodsOutput> => {
  const foundAllFoods = await Food.find();

  return { payload: foundAllFoods };
};
