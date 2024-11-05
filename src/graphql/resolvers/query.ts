import { GetFoodProps } from 'src/modules/food/props/getFoodProps';
import { queries } from 'src/common';
import * as foodService from '../../modules/food/food.service';
import * as orderService from '../../modules/order/order.service';
import * as userService from '../../modules/user/user.service';
import * as authService from '../../modules/auth/auth.service';
import { LoginProps } from 'src/modules/auth/props/logIn.props';
import { GetOrderByIdProps } from 'src/modules/order/props/getOrderProps';
import { GetUserByIdProps } from 'src/modules/user/props/getUserById.props';

export const query = queries({
  LOGIN: (_, args: LoginProps) => {
    return authService.login(args);
  },
  GET_ALL_USERS: () => {
    return userService.getAllUsers();
  },
  GET_USER_BY_ID: (_, args: GetUserByIdProps) => {
    return userService.getUserById(args);
  },
  GET_FOOD_BY_ID: (_, args: GetFoodProps) => {
    return foodService.getFoodById(args);
  },
  GET_ORDER_BY_ID: (_, args: GetOrderByIdProps) => {
    return orderService.getOrderById(args);
  },
  GET_CART_ITEMS_BY_USER_ID: () => 1,
  GET_DASHBOARD: () => 1,
});
