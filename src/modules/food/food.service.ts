import {
  BadRequestError,
  BadUserInputError,
  GraphQLError,
  InternalServerError,
} from 'src/common';
import { Food } from './food.model';
import { FoodOutput } from './outputs/food.output';
import { CreateFoodProps } from './props/createFoodProps';
import { GetFoodProps } from './props/getFoodProps';
import { UpdateFoodProps } from './props/updateFoodProps';

export const createFood = async ({
  food,
}: CreateFoodProps): Promise<FoodOutput> => {
  try {
    const createdFood = await Food.create(food);
    if (!createdFood) {
      throw new BadRequestError('Something went wrong!');
    }
    return { payload: createdFood };
  } catch {
    throw new GraphQLError('Error during creating food', 'BAD_USER_INPUT');
  }
};

export const updateFoodById = async ({
  id,
  food,
}: UpdateFoodProps): Promise<FoodOutput> => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(id, food, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      throw new GraphQLError('Food not found', 'BAD_REQUEST');
    }

    return { payload: updatedFood };
  } catch {
    throw new InternalServerError('Error during updating the food');
  }
};

export const getFoodById = async ({
  id,
}: GetFoodProps): Promise<FoodOutput> => {
  try {
    const foundFood = await Food.findById(id);

    if (!foundFood) {
      throw new BadRequestError('Food not found');
    }

    return { payload: foundFood };
  } catch {
    throw new InternalServerError('Error during getting food!');
  }
};

export const deleteFoodById = async ({
  id,
}: GetFoodProps): Promise<FoodOutput> => {
  try {
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      throw new BadUserInputError('Food not found!');
    }

    return { payload: deletedFood };
  } catch {
    throw new InternalServerError('Error during deleting error');
  }
};
