import { QUERIES } from "../../constants/queries";
import { Resolvers } from "../../types/resolvers";
import * as userService from "../../modules/user/user.service";

export const query: Resolvers = {
  [QUERIES.GET_ALL_USERS]: (_, args) => {
    return userService.getAllUsers();
  },
};
