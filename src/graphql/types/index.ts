import { userTypes } from 'src/modules/user/user.type';
import { scalarTypes } from './scalars';
import { foodTypes } from 'src/modules/food/food.types';
import { orderTypes } from 'src/modules/order/order.types';
import { cartItemTypes } from 'src/modules/cartItem/cartItem.type';
import { subscriptionType } from './subscription';
import { queryType } from './query';
import { mutationType } from './mutation';
import { gql } from 'apollo-server-core';
import { authTypes } from 'src/modules/auth/auth.type';

export const typeDefs = gql`
  ${scalarTypes}

  ${authTypes}
  ${userTypes}
  ${foodTypes}
  ${orderTypes}
  ${cartItemTypes}

  ${subscriptionType}
  ${queryType}
  ${mutationType}
`;
