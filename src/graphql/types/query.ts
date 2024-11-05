import { gql } from 'apollo-server-core';
import { QUERIES } from '../../constants/queries';

export const queryType = gql`
  type Query {
    ${QUERIES.LOGIN}(auth: AuthInput): AuthOutput
    ${QUERIES.GET_ALL_USERS}: UsersOutput
    ${QUERIES.GET_CART_ITEMS_BY_USER_ID}: CartItemsOutput
    ${QUERIES.GET_FOOD_BY_ID}: FoodOutput
    ${QUERIES.GET_ORDER_BY_ID}: OrderOutput
    ${QUERIES.GET_USER_BY_ID}: UserOutput
    ${QUERIES.GET_DASHBOARD}: Int
  }
`;
