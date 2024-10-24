import { Resolvers } from "../../types/resolvers";
import * as cartService from "../../modules/cart/cart.service";
import { MUTATIONS } from "../../constants/mutations";
import { AddFoodIntoCartProps } from "../../modules/cart/props/mutateFoodInCart.props";

export const mutation: Resolvers = {
  [MUTATIONS.ADD_FOOD_INTO_CART]: (_, args: AddFoodIntoCartProps, context) => {
    return cartService.addFoodIntoCart(args, context);
  },
};
