import { POPULATIONS } from 'src/constants/populations';
import { CartItem } from '../cartItem/cartItem.model';
import { OrderItem } from './orderItem.model';
import { OrderItemProps } from './types/orderItem.type';

export const addCartItemToOrderItem = async ({
  id,
}: OrderItemProps): Promise<any> => {
  const foundCartItem = await CartItem.find({ _id: id }).populate(
    POPULATIONS.cartItem,
  );

  const createdOrderItem = await OrderItem.insertMany(
    foundCartItem.map(({ _id, ...cartProduct }) => cartProduct),
  );
  console.log(foundCartItem);
  return createdOrderItem;
};
