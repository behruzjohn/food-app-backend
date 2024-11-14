import { gql } from 'apollo-server-core';
import { MUTATIONS } from '../../constants/mutations';

export const mutationType = gql`
  type Mutation {
    ${MUTATIONS.CREATE_CART_ITEM}(data: CartItemInput): CartItemOutput
    ${MUTATIONS.UPDATE_CART_FOOD_QUANTITY}(food: ID, quantity: Int): CartItemOutput
    ${MUTATIONS.DELETE_CART_ITEM}(food: ID): CartItemOutput
    ${MUTATIONS.CREATE_FOOD}(food: FoodInput!, image: Upload!): FoodOutput
    ${MUTATIONS.UPDATE_FOOD_BY_ID}(foodId: ID!, food: FoodUpdateInput!): FoodOutput
    ${MUTATIONS.UPDATE_CATEGORY_BY_ID}(categoryId: ID!, category: CategoryInput): CategoryOutput
    ${MUTATIONS.DELETE_CATEGORY_BY_ID}(categoryId: ID!): CategoryOutput
    ${MUTATIONS.CREATE_CATEGORY}(category: CategoryInput!): CategoryOutput
    ${MUTATIONS.DELETE_FOOD_BY_ID}(foodId: ID!): FoodDeleteOutput
    ${MUTATIONS.CREATE_COURIER}(data: CourierInput!): CourierOutput
    ${MUTATIONS.DELETE_COURIER_BY_ID}(userId: ID!): UserOutput
    ${MUTATIONS.CLEAR_USER_CART}: CartItemsOutput
    ${MUTATIONS.UPDATE_COURIER_BY_ID}(courierId: ID!, data: UpdateCourierInput!): CourierOutput
  }
`;
