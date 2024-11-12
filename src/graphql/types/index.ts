import { gql } from 'apollo-server-core';
import { authTypes } from 'src/modules/auth/auth.type';
import { cartItemTypes } from 'src/modules/cartItem/cartItem.types';
import { categoryTypes } from 'src/modules/category/category.types';
import { foodTypes } from 'src/modules/food/food.types';
import { orderTypes } from 'src/modules/order/order.types';
import { userTypes } from 'src/modules/user/user.types';
import { mutationType } from './mutation';
import { queryType } from './query';
import { scalarTypes } from './scalars';
import { subscriptionType } from './subscription';
import { courierTypes } from 'src/modules/courier/courier.types';

export const typeDefs = gql`
  ${scalarTypes}

  ${authTypes}
  ${userTypes}
  ${foodTypes}
  ${orderTypes}
  ${cartItemTypes}
  ${categoryTypes}
  ${courierTypes}

  ${subscriptionType}
  ${queryType}
  ${mutationType}
`;
