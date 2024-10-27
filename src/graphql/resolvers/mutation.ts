import { CreateFoodProps } from 'src/modules/food/props/createFoodProps';
import { UpdateFoodProps } from 'src/modules/food/props/updateFoodProps';
import { MUTATIONS } from '../../constants/mutations';
import * as cartService from '../../modules/cart/cart.service';
import { MutateFoodIntoCartProps } from '../../modules/cart/props/mutateFoodInCart.props';
import * as foodService from '../../modules/food/food.service';
import { GetFoodProps } from '../../modules/food/props/getFoodProps';
import { Resolvers } from '../../types/resolvers';

export const mutation: Resolvers = {
  [MUTATIONS.ADD_FOOD_INTO_CART]: (
    _,
    args: MutateFoodIntoCartProps,
    context,
  ) => {
    return cartService.addFoodIntoCart(args, context);
  },
  [MUTATIONS.CREATE_FOOD]: (_, args: CreateFoodProps) => {
    return foodService.createFood(args);
  },
  [MUTATIONS.UPDATE_FOOD_BY_ID]: (_, args: UpdateFoodProps) => {
    return foodService.updateFoodById(args);
  },
  [MUTATIONS.DELETE_FOOD_BY_ID]: (_, args: GetFoodProps) => {
    return foodService.deleteFoodById(args);
  },
};
