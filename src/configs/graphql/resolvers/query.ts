import { resolversHandlers } from 'src/common';
import { Resolver } from 'src/common/resolver/resolver.type';
import { QUERIES } from 'src/constants/queries';
import { SignInProps } from 'src/modules/auth/props/signIn.props';
import { TelegramLoginProps } from 'src/modules/auth/props/telegramLogin.props';
import { GetCategoryByIdProps } from 'src/modules/category/props/getCategoryProps';
import { GetCouriersProps } from 'src/modules/courier/props/getCourier.props';
import { GetAllFoodsProps } from 'src/modules/food/props/getAllFoods.props';
import { GetFoodByIdProps } from 'src/modules/food/props/getFood.props';
import { GetOrderByIdProps } from 'src/modules/order/props/getOrder.props';
import { GetOrdersProps } from 'src/modules/order/props/getOrders.props';
import { GetOrdersByUserIdProps } from 'src/modules/order/props/getOrdersByUserId.props';
import { GetUserByIdProps } from 'src/modules/user/props/getUserById.props';
import { GetUsersProps } from 'src/modules/user/props/getUsers.props';
import { PaginateProps } from 'src/props/paginate.props';
import * as authService from 'src/modules/auth/auth.service';
import * as cartItemService from 'src/modules/cartItem/cartItem.service';
import * as categoryService from 'src/modules/category/category.service';
import * as courierService from 'src/modules/courier/courier.service';
import * as foodService from 'src/modules/food/food.service';
import * as orderService from 'src/modules/order/order.service';
import * as userService from 'src/modules/user/user.service';
import { Context } from 'src/types/context';

export const query = resolversHandlers(QUERIES)<Resolver<unknown, unknown>>({
  TELEGRAM_USER_LOGIN: (_, args: TelegramLoginProps) => {
    return authService.telegramUserLogin(args);
  },
  GET_USERS: (_, args: GetUsersProps) => {
    return userService.getUsers(args);
  },
  GET_USER_BY_ID: (_, args: GetUserByIdProps, context: Context) => {
    return userService.getUserById(args, context);
  },
  GET_FOOD_BY_ID: (_, args: GetFoodByIdProps, context: Context) => {
    return foodService.getFoodById(args, context);
  },
  GET_ORDER_BY_ID: (_, args: GetOrderByIdProps) => {
    return orderService.getOrderById(args);
  },
  GET_CART_ITEMS_BY_USER_ID: (_, __, context) => {
    return cartItemService.getCartItemsByUserId(context);
  },
  GET_DASHBOARD: () => 1,
  GET_ALL_FOODS: (_, args: GetAllFoodsProps, context: Context) => {
    return foodService.getAllFoods(args, context);
  },
  GET_CATEGORY_BY_ID: (_, args: GetCategoryByIdProps) => {
    return categoryService.getCategoryById(args);
  },
  GET_ALL_CATEGORIES: () => {
    return categoryService.getAllCategories();
  },
  GET_COURIERS: (_, args: GetCouriersProps) => {
    return courierService.getCouriers(args);
  },
  GET_ORDERS: (_, args: GetOrdersProps) => {
    return orderService.getOrders(args);
  },
  GET_FAVORITE_FOODS: (_, args: PaginateProps, context) => {
    return foodService.getFavoriteFoods(args, context);
  },
  SIGN_IN: (_, args: SignInProps) => {
    return authService.signIn(args);
  },
  GET_ORDERS_BY_USER_ID: (
    _,
    args: GetOrdersByUserIdProps,
    context: Context,
  ) => {
    return orderService.getOrdersByUserId(args, context);
  },
});
