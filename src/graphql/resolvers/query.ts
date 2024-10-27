import { QUERIES } from '../../constants/queries';
import * as foodService from '../../modules/food/food.service';
import { GetFoodProps } from '../../modules/food/props/getFoodProps';
import * as userService from '../../modules/user/user.service';
import { Resolvers } from '../../types/resolvers';

export const query: Resolvers = {
  [QUERIES.GET_ALL_USERS]: () => {
    return userService.getAllUsers();
  },
  [QUERIES.GET_FOOD_BY_ID]: (_, args: GetFoodProps) => {
    return foodService.getFoodById(args);
  },
};
