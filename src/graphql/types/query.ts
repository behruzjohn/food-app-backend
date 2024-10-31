import { gql } from 'apollo-server-core';
import { QUERIES } from '../../constants/queries';

export const queryType = gql`
  type Query {
    ${QUERIES.GET_ALL_USERS}: [UserOutput!]
    ${QUERIES.GET_FOOD_BY_ID}: FoodOutput
    ${QUERIES.GET_ORDER_BY_ID}: OrderOutput
    ${QUERIES.GET_USER_BY_ID}: UserOutput
  }
`;
