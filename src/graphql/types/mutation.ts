import { gql } from 'apollo-server-core';
import { MUTATIONS } from '../../constants/mutations';

export const mutationType = gql`
  type Mutation {
    ${MUTATIONS.CREATE_CART_ITEM}(data: CartItemInput): CartItemOutput
    ${MUTATIONS.UPDATE_CART_FOOD_QUANTITY}(cartItemId: ID, quantity: Int): CartItemOutput
    ${MUTATIONS.DELETE_CART_ITEM}(food: ID): CartItemOutput
    ${MUTATIONS.CREATE_FOOD}(food: FoodInput!, image: Upload): FoodOutput
    ${MUTATIONS.UPDATE_FOOD_BY_ID}(foodId: ID!, food: FoodUpdateInput!): FoodOutput
    ${MUTATIONS.UPDATE_CATEGORY_BY_ID}(categoryId: ID!, category: CategoryInput): CategoryOutput
    ${MUTATIONS.DELETE_CATEGORY_BY_ID}(categoryId: ID!): CategoryOutput
    ${MUTATIONS.CREATE_CATEGORY}(category: CategoryInput!): CategoryOutput
    ${MUTATIONS.DELETE_FOOD_BY_ID}(foodId: ID!): FoodOutput
    ${MUTATIONS.CREATE_COURIER}(userId: ID!): CourierOutput
    ${MUTATIONS.DELETE_COURIER_BY_ID}(userId: ID!): UserOutput
    ${MUTATIONS.CLEAR_USER_CART}: CartItemsOutput
    ${MUTATIONS.UPDATE_ORDER_STATUS_BY_ID}(orderId: ID, status: String): OrderOutput
    ${MUTATIONS.DELIVER_ORDER_BY_ID}(orderId: ID): OrderOutput
    ${MUTATIONS.RECEIVE_ORDER_BY_ID}(orderId: ID): OrderOutput
    ${MUTATIONS.START_COOKING_FOOD}(orderId: ID, status: StatusEnum): OrderOutput
    ${MUTATIONS.CREATE_ORDER}(order: OrderInput): OrderOutput
    ${MUTATIONS.ATTACH_ORDER}(orderId: ID): CourierOutput
    ${MUTATIONS.ADD_FOOD_TO_FAVORITES}(foodId: ID!): FoodOutput
    ${MUTATIONS.REMOVE_FOOD_FROM_FAVORITES}(foodId: ID!): FoodOutput
    ${MUTATIONS.UPDATE_USER_BY_ID}(userId: ID!, data: UpdateUserInput): UserOutput 
    ${MUTATIONS.SIGN_UP}(data: SignUpInput!): SignUpOutput
    ${MUTATIONS.CONFIRM_SIGN_UP}(data: ConfirmationInput!): AuthOutput
    ${MUTATIONS.UPDATE_USER_PASSWORD_BY_ID}(data: UpdateUserPasswordInput): UserOutput
  }
`;
