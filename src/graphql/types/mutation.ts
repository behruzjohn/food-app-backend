import { gql } from 'apollo-server-core';
import { MUTATIONS } from '../../constants/mutations';

export const mutationType = gql`
  type Mutation {
    ${MUTATIONS.CREATE_CART_ITEM}(food: ID): CartItemOutput
    ${MUTATIONS.UPDATE_CART_FOOD_QUANTITY}(food: ID, quantity: Int): CartItemOutput
    ${MUTATIONS.DELETE_CART_ITEM}(food: ID): CartItemOutput
    ${MUTATIONS.CREATE_FOOD}(food: FoodInput!): FoodOutput 
    ${MUTATIONS.UPDATE_FOOD_BY_ID}(food: FoodUpdateInput!): FoodOutput 
    ${MUTATIONS.DELETE_FOOD_BY_ID}(food: ID!): FoodDeleteOutput 
    ${MUTATIONS.CREATE_ORDER}(order: OrderInput!): OrderOutput 
    ${MUTATIONS.GET_ORDER_BY_ID}(orderId: ID!): OrderOutput 
    ${MUTATIONS.UPDATE_USER_BY_ID}(user: UserInput): UserOutput
  }
`;
