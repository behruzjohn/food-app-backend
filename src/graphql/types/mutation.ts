import { gql } from 'apollo-server-core';
import { MUTATIONS } from '../../constants/mutations';

export const mutationType = gql`
  type Mutation {
    ${MUTATIONS.ADD_FOOD_INTO_CART}(food: ID!): CartOutput # 1
    ${MUTATIONS.CREATE_FOOD}(food: FoodInput!): FoodOutput # 1
    ${MUTATIONS.UPDATE_FOOD_BY_ID}(food: FoodUpdateInput!): FoodOutput # 1
    ${MUTATIONS.DELETE_FOOD_BY_ID}(food: ID!): FoodDeleteOutput # 1
    ${MUTATIONS.CREATE_ORDER}(order: OrderInput!): OrderOutput # 1
    ${MUTATIONS.GET_ORDER_BY_ID}(orderId: ID!): OrderOutput # 1
  }
  
`;
