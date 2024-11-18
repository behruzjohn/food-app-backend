import { BadRequestError, BadUserInputError, GraphQLError } from 'src/common';
import { POPULATIONS } from 'src/constants/populations';
import { saveFile } from 'src/helpers/file';
import Category from '../category/category.model';
import { Food } from './food.model';
import { FoodOutput } from './outputs/food.output';
import { FoodsOutput } from './outputs/foods.output';
import { CreateFoodProps } from './props/createFood.props';
import { GetAllFoodsProps } from './props/getAllFoods.props';
import { GetFoodByIdProps } from './props/getFood.props';
import { GetFoodsByCategoryProps } from './props/getFoodsByCategory.props';
import { UpdateFoodProps } from './props/updateFood.props';
import { Context } from 'src/types/context';
import { User } from '../user/user.model';

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
    throw new BadUserInputError('Food not found');
  }

  return { payload: deletedFood };
};

export const getFavoriteFoods = async (
  { limit, page }: PaginateProps,
  { user }: Context,
): Promise<Paginated<FoodsOutput>> => {
  const foundUser = await User.findById(user._id);

  const favoriteFoods = foundUser.favoriteFoods.map((_id) => ({ _id }));

  const foundFoods = await Food.find({
    $or: favoriteFoods,
  }).paginate({ limit, page });

  return { payload: foundFoods };
};

export const addFoodToFavorites = async (
  { foodId }: GetFoodByIdProps,
  { user }: Context,
): Promise<FoodOutput> => {
  const updatedFood = await Food.findByIdAndUpdate(
    foodId,
    {
      $inc: { likes: 1 },
    },
    { new: true },
  );

  if (!updatedFood) {
    throw new BadUserInputError('Food not found');
  }

  await User.findByIdAndUpdate(user._id, {
    $push: { favoriteFoods: foodId },
  });

  return { payload: updatedFood };
};

export const removeFoodFromFavorites = async (
  { foodId }: GetFoodByIdProps,
  { user }: Context,
): Promise<FoodOutput> => {
  const updatedFood = await Food.findByIdAndUpdate(
    foodId,
    {
      $inc: { likes: -1 },
    },
    { new: true },
  );

  if (!updatedFood) {
    throw new BadUserInputError('Food not found');
  }

  await User.findByIdAndUpdate(user._id, {
    $pull: { favoriteFoods: foodId },
  });

  return { payload: updatedFood };
};

export const getAllFoods = async ({
  name,
  categories,
}: GetAllFoodsProps): Promise<FoodsOutput> => {
  const nameRegex = name ? new RegExp(name, 'i') : null;

  if (name && !categories?.length) {
    const matchedCategory = await Category.find({
      name: { $regex: new RegExp(name, 'i') },
    });

    categories = matchedCategory.map((category) => category._id);
  }

  const searchConditions = [];

  if (nameRegex) {
    searchConditions.push(
      { shortName: { $regex: nameRegex } },
      { name: { $regex: nameRegex } },
    );
  }

  if (categories?.length) {
    searchConditions.push({ category: { $in: categories } });
  }

  const foundFoods = await Food.find(
    searchConditions.length ? { $or: searchConditions } : {},
  ).populate(POPULATIONS.food);

  return { payload: foundFoods };
};
