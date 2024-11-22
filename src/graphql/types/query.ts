import { gql } from 'apollo-server-core';
import { QUERIES } from '../../constants/queries';
import { paginationProps } from './common';

export const queryType = gql`
  type Query {
    ${QUERIES.TELEGRAM_USER_LOGIN}(auth: TelegramUserInput): AuthOutput
    ${QUERIES.GET_ALL_USERS}: UsersOutput
    ${QUERIES.GET_CART_ITEMS_BY_USER_ID}: CartOutput
    ${QUERIES.GET_FOOD_BY_ID}(foodId: ID!): FoodOutput
    ${QUERIES.GET_ORDER_BY_ID}(orderId: ID!): OrderOutput
    ${QUERIES.GET_USER_BY_ID}(userId: ID): UserOutput
    ${QUERIES.GET_USERS_BY_PHONE}(phone: String!): UsersOutput
    ${QUERIES.GET_DASHBOARD}: Int
    ${QUERIES.GET_CATEGORY_BY_ID}(categoryId: ID!): CategoryOutput
    ${QUERIES.GET_ALL_CATEGORIES}: CategoriesOutput
    ${QUERIES.SIGN_IN}(data: AuthInput!): AuthOutput 
    ${QUERIES.GET_COURIERS}(name: String, phone: Int): CouriersOutput
    ${QUERIES.GET_ORDERS}(statuses: String, ${paginationProps}): OrdersOutput
    ${QUERIES.GET_ALL_FOODS}(name: String, categories: [ID], ${paginationProps}): FoodsOutput
    ${QUERIES.GET_FAVORITE_FOODS}(${paginationProps}): FoodsOutput
  }
`;
