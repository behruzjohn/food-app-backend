import { CreateFoodProps } from 'src/modules/food/props/createFoodProps';
import { UpdateFoodProps } from 'src/modules/food/props/updateFoodProps';
import * as orderService from 'src/modules/order/order.service';
import { CreateOrderProps } from 'src/modules/order/props/createOrderProps';
import { GetOrderByIdProps } from 'src/modules/order/props/getOrderProps';
import { Context } from 'src/types/context';
import { MUTATIONS } from '../../constants/mutations';
import * as cartService from '../../modules/cart/cart.service';
import { MutateFoodIntoCartProps } from '../../modules/cart/props/mutateFoodInCart.props';
import * as foodService from '../../modules/food/food.service';
import { GetFoodProps } from '../../modules/food/props/getFoodProps';
import { Resolvers } from '../../types/resolvers';
import * as userService from 'src/modules/user/user.service';
import { CreateUserProps } from 'src/modules/user/props/createUser.props';
import { UpdateUserByIdProps } from 'src/modules/user/props/updateUser.props';

export const mutation: Resolvers = {
  [MUTATIONS.ADD_FOOD_INTO_CART]: (
    _,
    args: MutateFoodIntoCartProps,
    context,
  ) => {
    return cartService.addFoodIntoCart(args, context);
  },

  [MUTATIONS.CREATE_FOOD]: (_, args: CreateFoodProps) => {
    return foodService.createFood(args);
  },

  [MUTATIONS.UPDATE_FOOD_BY_ID]: (_, args: UpdateFoodProps) => {
    return foodService.updateFoodById(args);
  },

  [MUTATIONS.DELETE_FOOD_BY_ID]: (_, args: GetFoodProps) => {
    return foodService.deleteFoodById(args);
  },

  [MUTATIONS.CREATE_ORDER]: (_, args: CreateOrderProps, context: Context) => {
    return orderService.createOrder(args, context);
  },

  [MUTATIONS.CREATE_USER]: (_, args: CreateUserProps) => {
    return userService.createUser(args);
  },

  [MUTATIONS.UPDATE_USER_BY_ID]: (_, args: UpdateUserByIdProps) => {
    return userService.updateUserById(args);
  },
};
