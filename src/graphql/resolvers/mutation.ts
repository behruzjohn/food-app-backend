import { CreateFoodProps } from 'src/modules/food/props/createFoodProps';
import { UpdateFoodProps } from 'src/modules/food/props/updateFoodProps';
import * as orderService from 'src/modules/order/order.service';
import { CreateOrderProps } from 'src/modules/order/props/createOrderProps';
import { Context } from 'src/types/context';
import * as cartItemService from '../../modules/cartItem/cartItem.service';
import * as foodService from '../../modules/food/food.service';
import { GetFoodByIdProps } from '../../modules/food/props/getFoodProps';
import { UpdateCartFoodQuantityProps } from 'src/modules/cartItem/props/updateCartFoodQuantity.props';
import { MutateCartItemFoodProps } from 'src/modules/cartItem/props/mutateCartItemFood.props';
import { mutations } from 'src/common';

export const mutation = mutations({
  CREATE_CART_ITEM: (_, args: MutateCartItemFoodProps, context) => {
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
});
