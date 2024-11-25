import { CartItem } from '../cartItem/cartItem.model';
import { OrderItem } from './orderItem.model';
import { OrderItemOutput } from './outputs/orderItem.output';
import { OrderItemProps } from './types/orderItem.type';

export const addCartItemToOrderItem = async ({
  userId,
  orderId,
}: OrderItemProps): Promise<OrderItemOutput> => {
  const foundCartItem = await CartItem.find({ user: userId });
  const createdOrderItem = <(typeof OrderItem.schema.obj)[]>(
    await OrderItem.insertMany(
      foundCartItem.map(({ _id, ...cartProduct }) => ({
        ...cartProduct,
        order: orderId,
      })),
    )
  );

  return { payload: createdOrderItem };
};
