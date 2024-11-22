import { POPULATIONS } from 'src/constants/populations';
import { CartItem } from '../cartItem/cartItem.model';
import { OrderItem } from './orderItem.model';

export const addCartItemToOrderItem = async ({ id }: any): Promise<any> => {
  const foundCartItem = await CartItem.find({ _id: id }).populate(
    POPULATIONS.cartItem,
  );

  const createdOrderItem = await OrderItem.insertMany(
    foundCartItem.map(({ _id, ...cartProduct }) => cartProduct),
  );
  return createdOrderItem;
};
