import { gql } from 'apollo-server-core';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';

export const subscriptionType = gql`
  type Subscription {
    ${SUBSCRIPTIONS.UPDATE_ORDER_STATUS_BY_ID}(order: OrderStatusUpdateInput!): OrderOutput
    ${SUBSCRIPTIONS.DELIVER_ORDER_BY_ID}(food: ID!): FoodOutput
    ${SUBSCRIPTIONS.RECEIVE_ORDER_BY_ID}(food: ID!): FoodOutput
    ${SUBSCRIPTIONS.START_COOKING_FOOD}: Int
  }
`;
