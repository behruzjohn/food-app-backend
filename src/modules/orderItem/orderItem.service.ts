import { UserInputError } from 'apollo-server-core';
import { CartItem } from '../cartItem/cartItem.model';
import { OrderItem } from './orderItem.model';
import { OrderItemOutput } from './outputs/orderItem.output';
import { OrderItemProps } from './types/orderItem.type';

export const addCartItemToOrderItem = async ({
  userId,
  orderId,
}: OrderItemProps): Promise<OrderItemOutput> => {
  const foundCartItems = await CartItem.find({ user: userId });

  if (!foundCartItems.length) {
    throw new UserInputError('There are no items in cart');
  }

  const createdOrderItems = <(typeof OrderItem.schema.obj)[]>(
    await OrderItem.insertMany(
      foundCartItems.map(({ _id, ...cartItem }) => ({
        ...cartItem,
        order: orderId,
      })),
    )
  );

  return { payload: createdOrderItems };
};
