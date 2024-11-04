import { Resolvers } from "../../types/resolvers";
import * as cartItemService from "../../modules/cartItem/cartItem.service";
import { MUTATIONS } from "../../constants/mutations";
import { MutateCartItemFoodProps } from "src/modules/cartItem/props/mutateCartItemFood.props";
import { UpdateCartFoodQuantityProps } from "src/modules/cartItem/props/updateCartFoodQuantity.props";

export const mutation: Resolvers = {
  [MUTATIONS.CREATE_CART_ITEM]: (_, args: MutateCartItemFoodProps, context) => {
    return cartItemService.createCartItem(args, context);
  },
  [MUTATIONS.UPDATE_CART_FOOD_QUANTITY]: (
    _,
    args: UpdateCartFoodQuantityProps,
    context
  ) => {
    return cartItemService.updateCartFoodQuantity(args, context);
  },
  [MUTATIONS.DELETE_CART_ITEM]: (_, args: MutateCartItemFoodProps, context) => {
    return cartItemService.deleteCartItem(args, context);
  },
};
