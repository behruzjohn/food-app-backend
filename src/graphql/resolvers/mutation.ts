import { mutations } from 'src/common';
import { MutateCartItemFoodProps } from 'src/modules/cartItem/props/mutateCartItemFood.props';
import { UpdateCartFoodQuantityProps } from 'src/modules/cartItem/props/updateCartFoodQuantity.props';
import { CreateCategoryProps } from 'src/modules/category/props/createCategoryProps';
import { GetCategoryByIdProps } from 'src/modules/category/props/getCategoryProps';
import { UpdateCategoryProps } from 'src/modules/category/props/updateCategoryProps';
import { CreateFoodProps } from 'src/modules/food/props/createFoodProps';
import { UpdateFoodProps } from 'src/modules/food/props/updateFoodProps';
import * as orderService from 'src/modules/order/order.service';
import { CreateOrderProps } from 'src/modules/order/props/createOrderProps';
import { GetUserByIdProps } from 'src/modules/user/props/getUserById.props';
import { GetUsersByPhoneProps } from 'src/modules/user/props/getUsersByPhone.props';
import { Context } from 'src/types/context';
import * as cartItemService from '../../modules/cartItem/cartItem.service';
import * as categoryService from '../../modules/category/category.service';
import * as foodService from '../../modules/food/food.service';
import { GetFoodByIdProps } from '../../modules/food/props/getFoodProps';
import { CreateCartItemProps } from 'src/modules/cartItem/props/createCartItem.props';
import * as userService from '../../modules/user/user.service';

export const mutation = mutations({
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
  CREATE_ORDER: (_, args: CreateOrderProps, context: Context) => {
    return orderService.createOrder(args, context);
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
  CREATE_COURIER: (_, args: GetUsersByPhoneProps) => {
    return userService.createCourier(args);
  },
  DELETE_COURIER_BY_ID: (_, args: GetUserByIdProps) => {
    return userService.deleteCourierById(args);
  },
});
