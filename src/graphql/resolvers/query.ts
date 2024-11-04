import { GetFoodProps } from 'src/modules/food/props/getFoodProps';
import { GetOrderByIdProps } from 'src/modules/order/props/getOrderProps';
import { GetUserByIdProps } from 'src/modules/user/props/getUserById.props';
import { QUERIES } from '../../constants/queries';
import * as foodService from '../../modules/food/food.service';
import * as orderService from '../../modules/order/order.service';
import * as userService from '../../modules/user/user.service';
import { Resolvers } from '../../types/resolvers';

export const query: Resolvers = {
  [QUERIES.GET_ALL_USERS]: () => {
    return userService.getAllUsers();
  },
  [QUERIES.GET_USER_BY_ID]: (_, args: GetUserByIdProps) => {
    return userService.getUserById(args);
  },
  [QUERIES.GET_FOOD_BY_ID]: (_, args: GetFoodProps) => {
    return foodService.getFoodById(args);
  },
  [QUERIES.GET_ORDER_BY_ID]: (_, args: GetOrderByIdProps) => {
    return orderService.getOrderById(args);
  },
};
