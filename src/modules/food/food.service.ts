import {
  BadRequestError,
  BadUserInputError,
  GraphQLError,
  InternalServerError,
} from 'src/common';
import { Food } from './food.model';
import { CreateOrderOutput } from './outputs/food.output';
import { CreateFoodProps } from './props/createFoodProps';
import { GetFoodProps } from './props/getFoodProps';
import { UpdateFoodProps } from './props/updateFoodProps';

export const createFood = async ({ food }:CreateFoodProps): Promise<CreateOrderOutput> => {
  try {
    const createdFood = await Food.create(food);

    return { payload: createdFood };
  } catch (error) {
    throw new GraphQLError('Error during creating food', 'BAD_USER_INPUT');
  }
};

export const updateFoodById = async ({
  id,
  food,
}: UpdateFoodProps): Promise<CreateOrderOutput> => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(id, food, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      throw new GraphQLError('Food not found', 'BAD_REQUEST');
    }

    return { payload: updatedFood };
  } catch (error) {
    throw new InternalServerError('Error during updating the food');
  }
};

export const getFoodById = async ({
  id,
}: GetFoodProps): Promise<CreateOrderOutput> => {
  try {
    const foundFood = await Food.findById(id);

    if (!foundFood) {
      throw new BadRequestError('Food not found');
    }

    return { payload: foundFood };
  } catch (error) {
    throw new InternalServerError('Error during getting food!');
  }
};

export const deleteFoodById = async ({
  id,
}: GetFoodProps): Promise<CreateOrderOutput> => {
  try {
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      throw new BadUserInputError('Food not found!');
    }

    return { payload: deletedFood };
  } catch (error) {
    throw new InternalServerError('Error during deleting error');
  }
};
