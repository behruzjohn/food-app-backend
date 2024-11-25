import { UserInputError } from 'apollo-server-core';
import { BadRequestError, BadUserInputError, GraphQLError } from 'src/common';
import { POPULATIONS } from 'src/constants/populations';
import { saveFile } from 'src/helpers/file';
import { PaginateProps } from 'src/props/paginate.props';
import { Context } from 'src/types/context';
import { Paginated } from 'src/types/paginated';
import Category from '../category/category.model';
import { User } from '../user/user.model';
import { Food } from './food.model';
import { FoodOutput } from './outputs/food.output';
import { FoodsOutput } from './outputs/foods.output';
import { CreateFoodProps } from './props/createFood.props';
import { GetAllFoodsProps } from './props/getAllFoods.props';
import { GetFoodByIdProps } from './props/getFood.props';
import { UpdateFoodProps } from './props/updateFood.props';
import { Types } from 'mongoose';

export const createFood = async ({
  image,
  food,
}: CreateFoodProps): Promise<FoodOutput> => {
  const foundCategories = await Category.find({
    categories: { $in: food.categories || [] },
  });

  if (
    !foundCategories.length ||
    foundCategories.length !== food.categories.length
  ) {
    throw new UserInputError('Category is not found');
  }

  const createdFood = await Food.create({
    ...food,
    image,
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
  const foundFood = await Food.findById(foodId).populate(POPULATIONS.food);

  if (!foundFood) {
    throw new BadRequestError('Food not found');
  }

  return { payload: foundFood };
};

export const deleteFoodById = async ({
  foodId,
}: GetFoodByIdProps): Promise<FoodOutput> => {
  const deletedFood = await Food.findByIdAndDelete(foodId).populate(
    POPULATIONS.food,
  );

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

  const { docs: foundFoods, ...pagination } = await Food.find({
    $or: favoriteFoods,
  }).paginate({ limit, page });

  return { payload: foundFoods, ...pagination };
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
  limit,
  page,
}: GetAllFoodsProps): Promise<Paginated<FoodsOutput>> => {
  const nameRegex = name ? new RegExp(name, 'i') : null;

  const searchConditions: any[] = [];
  if (nameRegex) {
    searchConditions.push(
      { shortName: { $regex: nameRegex } },
      { name: { $regex: nameRegex } },
    );
  }

  if (categories?.length) {
    searchConditions.push({
      categories: { $in: categories },
    });
  }

  const aggregationPipeline = [
    ...(searchConditions.length ? [{ $match: { $or: searchConditions } }] : []),
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categoriesInfo',
      },
    },
    {
      $facet: {
        docs: [
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $project: {
              _id: 1,
              shortName: 1,
              name: 1,
              image: 1,
              description: 1,
              price: 1,
              discount: 1,
              likes: 1,
              categories: 1,
            },
          },
        ],
        total: [{ $count: 'count' }],
      },
    },
  ];

  const [result] = await Food.aggregate(aggregationPipeline);

  const docs = result?.docs || [];
  const totalDocs = result?.total[0]?.count || 0;
  const totalPages = Math.ceil(totalDocs / limit);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;
  const offset = (page - 1) * limit;

  return {
    payload: docs,
    totalDocs,
    limit,
    page,
    totalPages,
    hasPrevPage,
    hasNextPage,
    offset,
    prevPage: hasPrevPage ? page - 1 : null,
    nextPage: hasNextPage ? page + 1 : null,
  };
};
