import { Context } from "../../types/context";
import { Food } from "../food/food.model";
import { CartItem } from "./cartItem.model";
import { BadUserInputError } from "src/common";
import { CartItemOutput } from "./outputs/cartItem.output";
import { MutateCartItemFoodProps } from "./props/mutateCartItemFood.props";
import { UpdateCartFoodQuantityProps } from "./props/updateCartFoodQuantity.props";
import { CartItemsOutput } from "./outputs/cartItems.output";

export const getCartItemsByUserId = async ({
  user,
}: Context): Promise<CartItemsOutput> => {
  const foundCartItems = await CartItem.find({ user: user.id });

  return { payload: foundCartItems };
};

export const createCartItem = async (
  { food }: MutateCartItemFoodProps,
  { user }: Context
): Promise<CartItemOutput> => {
  const foundFood = await Food.findById(food);

  if (!foundFood) {
    throw new BadUserInputError("Food is not found");
  }

  const createdCartItem = await CartItem.create({
    food,
    price: foundFood.price,
    quantity: 1,
    user: user.id,
  });

  return { payload: createdCartItem };
};

export const updateCartFoodQuantity = async (
  { food, quantity }: UpdateCartFoodQuantityProps,
  { user }: Context
): Promise<CartItemOutput> => {
  const updatedCartItem = await CartItem.findOneAndUpdate(
    {
      food,
      user: user.id,
    },
    { quantity },
    { new: true }
  );

  if (!updatedCartItem) {
    throw new BadUserInputError("Cart item is not found");
  }

  return { payload: updatedCartItem };
};

export const deleteCartItem = async (
  { food }: MutateCartItemFoodProps,
  { user }: Context
): Promise<CartItemOutput> => {
  const foundFood = await Food.findById(food);

  if (!foundFood) {
    throw new BadUserInputError("Food is not found");
  }

  const removedFood = await CartItem.findOneAndDelete({
    food,
    user: user.id,
  });

  return { payload: removedFood };
};
