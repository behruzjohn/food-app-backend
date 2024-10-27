import { gql } from 'apollo-server-core';
import { userTypes } from '../../modules/user/user.type';
import { queryType } from './query';
import { cartTypes } from '../../modules/cart/cart.type';
import { foodTypes } from '../../modules/food/food.types';
import { orderTypes } from '../../modules/order/order.types';
import { scalarTypes } from './scalars';
import { mutationType } from './mutation';

export const typeDefs = gql`
  ${scalarTypes}

  ${userTypes}
  ${foodTypes}
  ${orderTypes}
  ${cartTypes}

  ${queryType}
  ${mutationType}
`;
