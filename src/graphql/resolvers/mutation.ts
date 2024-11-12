import { MutateCartItemFoodProps } from 'src/modules/cartItem/props/mutateCartItemFood.props';
import { UpdateCartFoodQuantityProps } from 'src/modules/cartItem/props/updateCartFoodQuantity.props';
import { CreateCategoryProps } from 'src/modules/category/props/createCategoryProps';
import { GetCategoryByIdProps } from 'src/modules/category/props/getCategoryProps';
import { UpdateCategoryProps } from 'src/modules/category/props/updateCategoryProps';
import { CreateFoodProps } from 'src/modules/food/props/createFood.props';
import { UpdateFoodProps } from 'src/modules/food/props/updateFood.props';
import { GetUserByIdProps } from 'src/modules/user/props/getUserById.props';
import * as cartItemService from '../../modules/cartItem/cartItem.service';
import * as categoryService from '../../modules/category/category.service';
import * as foodService from '../../modules/food/food.service';
import * as courierService from '../../modules/courier/courier.service';
import { GetFoodByIdProps } from '../../modules/food/props/getFood.props';
import { CreateCartItemProps } from 'src/modules/cartItem/props/createCartItem.props';
import { resolversHandlers } from 'src/common';
import { MUTATIONS } from 'src/constants/mutations';
import { Resolver } from 'src/common/resolver/resolver.type';
import { GetCourierByIdProps } from 'src/modules/courier/props/getCourierById.props';

export const mutation = resolversHandlers(MUTATIONS)<
  Resolver<unknown, unknown>
>({
  CREATE_CART_ITEM: (_, args: CreateCartItemProps, context) => {
    return cartItemService.createCartItem(args, context);
  },
  UPDATE_CART_FOOD_QUANTITY: (
    _,
    args: UpdateCartFoodQuantityProps,
    context,
  ) => {
    return cartItemService.updateCartFoodQuantity(args, context);
  },
  DELETE_CART_ITEM: (_, args: MutateCartItemFoodProps, context) => {
    return cartItemService.deleteCartItem(args, context);
  },
  CREATE_FOOD: (_, args: CreateFoodProps) => {
    return foodService.createFood(args);
  },
  UPDATE_FOOD_BY_ID: (_, args: UpdateFoodProps) => {
    return foodService.updateFoodById(args);
  },
  DELETE_FOOD_BY_ID: (_, args: GetFoodByIdProps) => {
    return foodService.deleteFoodById(args);
  },
  CREATE_CATEGORY: (_, args: CreateCategoryProps) => {
    return categoryService.createCategory(args);
  },
  DELETE_CATEGORY_BY_ID: (_, args: GetCategoryByIdProps) => {
    return categoryService.deleteCategoryById(args);
  },
  UPDATE_CATEGORY_BY_ID: (_, args: UpdateCategoryProps) => {
    return categoryService.updateCategoryById(args);
  },
  DELETE_COURIER_BY_ID: (_, args: GetCourierByIdProps) => {
    return courierService.deleteCourierById(args);
  },
  CLEAR_USER_CART: (_, __, context) => {
    return cartItemService.clearUserCart(context);
  },
  CREATE_COURIER: (_, args: GetUserByIdProps) => {
    return courierService.createCourier(args);
  },
});
