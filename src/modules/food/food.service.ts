import { BadRequestError, BadUserInputError, GraphQLError } from 'src/common';
import { POPULATIONS } from 'src/constants/populations';
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
import { FilterQuery } from 'mongoose';
import { UserInputError } from 'apollo-server-core';
import { DEFAULT_PAGINATION_LIMIT } from 'src/constants/pagination';
import { UPLOADS_PATH } from 'src/constants/staticFoldersPaths';
import { FILE_CATEGORIES } from 'src/constants/fileCategories';
import fs from 'fs';
import path from 'path';
import { createPublicFileUrl } from 'src/utils/file';

export const createFood = async ({
  food,
}: CreateFoodProps): Promise<FoodOutput> => {
  const foundCategory = await Category.findById(food.category);

  if (!foundCategory) {
    throw new UserInputError('Category is not found');
  }

  const createdFood = await Food.create({
    ...food,
  });

  const foodsImages = fs.readdirSync(UPLOADS_PATH);

  const uploadedFoodImage = foodsImages.find(
    (name) => name.split('.')['0'] === FILE_CATEGORIES.food,
  );

  if (uploadedFoodImage) {
    const foodImage = `food-${createdFood._id}.${path.extname(uploadedFoodImage)}`;

    const foodImageFile = path.join(UPLOADS_PATH, uploadedFoodImage);
    const foodImageNewFile = path.join(UPLOADS_PATH, foodImage);

    fs.renameSync(foodImageFile, foodImageNewFile);

    const foodImagePublicUrl = createPublicFileUrl(foodImage);

    createdFood.image = foodImagePublicUrl;

    await createdFood.save();
  }

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
  limit = DEFAULT_PAGINATION_LIMIT,
  page = 1,
}: GetAllFoodsProps): Promise<Paginated<FoodsOutput>> => {
  const nameRegex = name ? new RegExp(name, 'i') : null;

  const searchConditions: FilterQuery<any>[] = [];

  if (nameRegex) {
    searchConditions.push(
      { shortName: { $regex: nameRegex } },
      { name: { $regex: nameRegex } },
    );
  }

  if (categories?.length) {
    searchConditions.push({
      category: { $in: categories.map((id) => new Types.ObjectId(id)) },
    });
  }

  const aggregationPipeline: Parameters<typeof Food.aggregate>['0'] = [
    ...(searchConditions.length ? [{ $match: { $or: searchConditions } }] : []),
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'categoryInfo',
      },
    },
    { $unwind: '$categoryInfo' },
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
              category: '$categoryInfo',
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
