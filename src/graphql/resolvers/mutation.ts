import { resolversHandlers } from 'src/common';
import { Resolver } from 'src/common/resolver/resolver.type';
import { MUTATIONS } from 'src/constants/mutations';
import { CreateCartItemProps } from 'src/modules/cartItem/props/createCartItem.props';
import { MutateCartItemFoodProps } from 'src/modules/cartItem/props/mutateCartItemFood.props';
import { UpdateCartFoodQuantityProps } from 'src/modules/cartItem/props/updateCartFoodQuantity.props';
import { CreateCategoryProps } from 'src/modules/category/props/createCategoryProps';
import { GetCategoryByIdProps } from 'src/modules/category/props/getCategoryProps';
import { UpdateCategoryProps } from 'src/modules/category/props/updateCategoryProps';
import { GetCourierByIdProps } from 'src/modules/courier/props/getCourierById.props';
import { CreateFoodProps } from 'src/modules/food/props/createFood.props';
import { UpdateFoodProps } from 'src/modules/food/props/updateFood.props';
import * as orderService from 'src/modules/order/order.service';
import { CreateOrderProps } from 'src/modules/order/props/createOrder.props';
import { GetOrderByIdProps } from 'src/modules/order/props/getOrder.props';
import { UpdateOrderStatusProps } from 'src/modules/order/props/updateOrder.props';
import { GetUserByIdProps } from 'src/modules/user/props/getUserById.props';
import { Context } from 'src/types/context';
import * as cartItemService from '../../modules/cartItem/cartItem.service';
import * as categoryService from '../../modules/category/category.service';
import * as courierService from '../../modules/courier/courier.service';
import * as foodService from '../../modules/food/food.service';
import { GetFoodByIdProps } from '../../modules/food/props/getFood.props';

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
  UPDATE_ORDER_STATUS_BY_ID: (_, args: UpdateOrderStatusProps) => {
    return orderService.updateOrderStatusById(args);
  },
  DELIVER_ORDER_BY_ID: (_, args: GetOrderByIdProps) => {
    return orderService.deliverOrderById(args);
  },
  RECEIVE_ORDER_BY_ID: (_, args: GetOrderByIdProps) => {
    return orderService.receiveOrderById(args);
  },
  START_COOKING_FOOD: (_, args: GetOrderByIdProps) => {
    return orderService.startCookingOrder(args);
  },
  CREATE_ORDER: (_, args: CreateOrderProps, context: Context) => {
    return orderService.createOrder(args, context);
  },
  ATTACH_ORDER: (_, args: GetOrderByIdProps, context: Context) => {
    return courierService.attachOrder(args, context);
  },
});
