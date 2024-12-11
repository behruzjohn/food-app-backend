import { UserInputError } from 'apollo-server-core';
import { CartItem } from '../cartItem/cartItem.model';
import { OrderItem } from './orderItem.model';
import { GetUserOrderItemsProps } from './props/getUserOrderItems.props';
import { OrderItemsOutput } from './outputs/orderItems.output';
import { GetOrderByIdProps } from '../order/props/getOrder.props';
import { POPULATIONS } from 'src/constants/populations';

export const addCartItemToOrderItem = async ({
  userId,
  orderId,
}: GetUserOrderItemsProps): Promise<OrderItemsOutput> => {
  const foundCartItems = await CartItem.find({ user: userId });

  if (!foundCartItems.length) {
    throw new UserInputError('There are no cart items created yet');
  }

  const createdOrderItems = await OrderItem.create(
    foundCartItems.map(({ _id, ...cartItem }) => {
      return {
        ...cartItem['_doc'],
        order: orderId,
      };
    }),
  );

  return { payload: createdOrderItems };
};

export const getOrderItemsByOrderId = async ({
  orderId,
}: GetOrderByIdProps): Promise<OrderItemsOutput> => {
  const foundOrderItems = await OrderItem.find({ order: orderId }).populate(
    POPULATIONS.orderItem,
  );

  return { payload: foundOrderItems };
};
