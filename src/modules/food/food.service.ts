import { BadRequestError, BadUserInputError, GraphQLError } from 'src/common';
import { Food } from './food.model';
import { FoodOutput } from './outputs/food.output';
import { CreateFoodProps } from './props/createFoodProps';
import { GetFoodByIdProps } from './props/getFoodProps';
import { UpdateFoodProps } from './props/updateFoodProps';
import { saveFile } from 'src/helpers/file';

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
  id,
  food,
}: UpdateFoodProps): Promise<FoodOutput> => {
  const updatedFood = await Food.findByIdAndUpdate(id, food, {
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
