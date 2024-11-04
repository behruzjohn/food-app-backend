import { gql } from "apollo-server-core";
import { userTypes } from "../../modules/user/user.type";
import { queryType } from "./query";
import { cartItemTypes } from "src/modules/cartItem/cartItem.type";
import { foodTypes } from "../../modules/food/food.types";
import { orderTypes } from "../../modules/order/order.types";
import { scalarTypes } from "./scalars";
import { mutationType } from "./mutation";
import { PERMISSIONS } from "src/constants/permissions";

export const typeDefs = gql`
  ${scalarTypes}

  ${userTypes}
  ${foodTypes}
  ${orderTypes}
  ${cartItemTypes}

  ${queryType}
  ${mutationType}
`;
PERMISSIONS;
