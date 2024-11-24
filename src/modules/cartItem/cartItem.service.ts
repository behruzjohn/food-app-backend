import { BadUserInputError } from 'src/common';
import { POPULATIONS } from 'src/constants/populations';
import { calculateTotalPrice } from 'src/helpers/price';
import { DeleteOutput } from 'src/outputs/delete.output';
import { Context } from '../../types/context';
import { Food } from '../food/food.model';
import { CartItem } from './cartItem.model';
import { CartOutput } from './outputs/cart.output';
import { CartItemOutput } from './outputs/cartItem.output';
import { CreateCartItemProps } from './props/createCartItem.props';
import { MutateCartItemFoodProps } from './props/mutateCartItemFood.props';
import { UpdateCartFoodQuantityProps } from './props/updateCartFoodQuantity.props';

export const getCartItemsByUserId = async ({
  user,
}: Context): Promise<CartOutput> => {
  const foundCartItems = await CartItem.find({ user: user._id }).populate(
    POPULATIONS.cartItem,
  );

  const totalPrice = calculateTotalPrice({
    priceField: 'price',
    discountField: 'discount',
    quantityField: 'quantity',
  })(foundCartItems);

  return {
    payload: {
      items: foundCartItems,
      totalPrice,
    },
  };
};

export const createCartItem = async (
  { data: { food, quantity } }: CreateCartItemProps,
  { user }: Context,
): Promise<CartItemOutput> => {
  const foundFood = await Food.findById(food);

  if (!foundFood) {
    throw new BadUserInputError('Food is not found');
  }

  const createdCartItem = await CartItem.create({
    food,
    quantity,
    price: foundFood.price,
    discount: foundFood.discount,
    user: user._id,
  });

  return { payload: createdCartItem };
};

export const updateCartFoodQuantity = async (
  { cartItemId, quantity }: UpdateCartFoodQuantityProps,
  { user }: Context,
): Promise<CartItemOutput> => {
  const updatedCartItem = await CartItem.findOneAndUpdate(
    {
      _id: cartItemId,
      user: user._id,
    },
    { quantity },
    { new: true },
  );

  if (!updatedCartItem) {
    throw new BadUserInputError('Cart item is not found');
  }

  return { payload: updatedCartItem };
};

export const deleteCartItem = async (
  { food }: MutateCartItemFoodProps,
  { user }: Context,
): Promise<CartItemOutput> => {
  const foundFood = await Food.findById(food);

  if (!foundFood) {
    throw new BadUserInputError('Food is not found');
  }

  const removedFood = await CartItem.findOneAndDelete({
    food,
    user: user._id,
  });

  return { payload: removedFood };
};

export const clearUserCart = async ({
  user,
}: Context): Promise<DeleteOutput> => {
  const deletedCartItems = await CartItem.deleteMany({ user: user._id });

  return { payload: deletedCartItems };
};
