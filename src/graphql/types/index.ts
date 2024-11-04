import { gql } from 'apollo-server-core';
import { cartTypes } from '../../modules/cart/cart.type';
import { foodTypes } from '../../modules/food/food.types';
import { orderTypes } from '../../modules/order/order.types';
import { userTypes } from '../../modules/user/user.type';
import { mutationType } from './mutation';
import { queryType } from './query';
import { scalarTypes } from './scalars';
import { subscriptionType } from './subscription';

export const typeDefs = gql`
  ${scalarTypes}

  ${userTypes}
  ${foodTypes}
  ${orderTypes}
  ${cartTypes}
  ${subscriptionType}

  ${queryType}
  ${mutationType}
`;
