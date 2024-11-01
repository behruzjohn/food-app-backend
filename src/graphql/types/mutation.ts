import { gql } from 'apollo-server-core';
import { MUTATIONS } from '../../constants/mutations';

export const mutationType = gql`
  type Mutation {
    ${MUTATIONS.ADD_FOOD_INTO_CART}(food: ID!): CartOutput 
    ${MUTATIONS.CREATE_FOOD}(food: FoodInput!): FoodOutput 
    ${MUTATIONS.UPDATE_FOOD_BY_ID}(food: FoodUpdateInput!): FoodOutput 
    ${MUTATIONS.DELETE_FOOD_BY_ID}(food: ID!): FoodDeleteOutput 
    ${MUTATIONS.CREATE_ORDER}(order: OrderInput!): OrderOutput 
    ${MUTATIONS.GET_ORDER_BY_ID}(orderId: ID!): OrderOutput 
    ${MUTATIONS.CREATE_USER}(user: UserInput): UserOutput
    ${MUTATIONS.UPDATE_USER_BY_ID}(user: UserInput): UserOutput
  }
  
`;
