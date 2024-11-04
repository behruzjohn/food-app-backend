import { CreateFoodProps } from 'src/modules/food/props/createFoodProps';
import { UpdateFoodProps } from 'src/modules/food/props/updateFoodProps';
import * as orderService from 'src/modules/order/order.service';
import { CreateOrderProps } from 'src/modules/order/props/createOrderProps';
import { Context } from 'src/types/context';
import { MUTATIONS } from '../../constants/mutations';
import * as cartItemService from '../../modules/cartItem/cartItem.service';
import * as foodService from '../../modules/food/food.service';
import { GetFoodProps } from '../../modules/food/props/getFoodProps';
import { Resolvers } from '../../types/resolvers';
import * as userService from 'src/modules/user/user.service';
import { UpdateUserByIdProps } from 'src/modules/user/props/updateUser.props';
import { UpdateCartFoodQuantityProps } from 'src/modules/cartItem/props/updateCartFoodQuantity.props';
import { MutateCartItemFoodProps } from 'src/modules/cartItem/props/mutateCartItemFood.props';

export const mutation: Resolvers = {
  [MUTATIONS.CREATE_CART_ITEM]: (_, args: MutateCartItemFoodProps, context) => {
    return cartItemService.createCartItem(args, context);
  },

  [MUTATIONS.UPDATE_CART_FOOD_QUANTITY]: (
    _,
    args: UpdateCartFoodQuantityProps,
    context
  ) => {
    return cartItemService.updateCartFoodQuantity(args, context);
  },

  [MUTATIONS.DELETE_CART_ITEM]: (_, args: MutateCartItemFoodProps, context) => {
    return cartItemService.deleteCartItem(args, context);
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

  [MUTATIONS.UPDATE_USER_BY_ID]: (_, args: UpdateUserByIdProps) => {
    return userService.updateUserById(args);
  },
};
