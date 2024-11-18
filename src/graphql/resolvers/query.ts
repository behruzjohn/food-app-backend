import { GetCategoryByIdProps } from 'src/modules/category/props/getCategoryProps';
import { GetAllFoodsProps } from 'src/modules/food/props/getAllFoods.props';
import { GetFoodByIdProps } from 'src/modules/food/props/getFood.props';
import { GetFoodsByCategoryProps } from 'src/modules/food/props/getFoodsByCategory.props';
import { GetOrderByIdProps } from 'src/modules/order/props/getOrder.props';
import { GetUserByIdProps } from 'src/modules/user/props/getUserById.props';
import { GetUsersByPhoneProps } from 'src/modules/user/props/getUsersByPhone.props';
import { Context } from 'src/types/context';
import * as authService from '../../modules/auth/auth.service';
import * as cartItemService from '../../modules/cartItem/cartItem.service';
import * as categoryService from '../../modules/category/category.service';
import * as foodService from '../../modules/food/food.service';
import * as orderService from '../../modules/order/order.service';
import * as userService from '../../modules/user/user.service';
import * as courierService from '../../modules/courier/courier.service';
import { resolversHandlers } from 'src/common';
import { QUERIES } from 'src/constants/queries';
import { Resolver } from 'src/common/resolver/resolver.type';
import { TelegramLoginProps } from 'src/modules/auth/props/telegramLogin.props';

export const query = resolversHandlers(QUERIES)<Resolver<unknown, unknown>>({
  TELEGRAM_USER_LOGIN: (_, args: TelegramLoginProps) => {
    return authService.telegramUserLogin(args);
  },
  GET_ALL_USERS: () => {
    return userService.getAllUsers();
  },
  GET_USER_BY_ID: (_, args: GetUserByIdProps, context: Context) => {
    return userService.getUserById(args, context);
  },
  GET_FOOD_BY_ID: (_, args: GetFoodByIdProps) => {
    return foodService.getFoodById(args);
  },
  GET_ORDER_BY_ID: (_, args: GetOrderByIdProps) => {
    return orderService.getOrderById(args);
  },
  GET_CART_ITEMS_BY_USER_ID: (_, args, context) => {
    return cartItemService.getCartItemsByUserId(context);
  },
  GET_DASHBOARD: () => 1,
  GET_USERS_BY_PHONE: (_, args: GetUsersByPhoneProps) => {
    return userService.getUsersByPhone(args);
  },
  GET_ALL_FOODS: (_, args: GetAllFoodsProps) => {
    return foodService.getAllFoods(args);
  },
  GET_CATEGORY_BY_ID: (_, args: GetCategoryByIdProps) => {
    return categoryService.getCategoryById(args);
  },
  GET_ALL_CATEGORIES: () => {
    return categoryService.getAllCategories();
  },
  GET_ALL_COURIERS: () => {
    return courierService.getAllCouriers();
  },
  GET_FAVORITE_FOODS: (_, __, context: Context) => {
    return foodService.getFavoriteFoods(context);
  },
});
