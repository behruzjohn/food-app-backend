import { ApolloError } from "apollo-server-core";
import { Context } from "../../types/context";
import { Food } from "../food/food.model";
import { Cart } from "./cart.model";
import { MutateFoodIntoCartProps } from "./props/mutateFoodInCart.props";

export const addFoodIntoCart = async (
  { food }: MutateFoodIntoCartProps,
  { user }: Context
) => {
  const foundCart = await Cart.findOne({ user: user.id });

  const foundFood = await Food.findById(food);

  if (!foundFood) {
    throw new ApolloError("Food is not found");
  }

  foundCart.foods.push();

  await foundCart.save();

  return { payload: foundCart };
};

export const removeFoodFromCart = async (
  { food }: MutateFoodIntoCartProps,
  { user }: Context
) => {
  const foundCart = await Cart.findOne({ user: user.id });

  const foundFood = await Food.findById(food);

  if (!foundFood) {
    throw new ApolloError("Food is not found");
  }

  foundCart.foods.filter(({ _id }) => _id !== food);

  await foundCart.save();

  return { payload: foundCart };
};
