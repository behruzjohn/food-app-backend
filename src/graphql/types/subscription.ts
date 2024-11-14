import { gql } from 'apollo-server-core';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';

export const subscriptionType = gql`
  type Subscription {
    ${SUBSCRIPTIONS.UPDATE_ORDER_STATUS_BY_ID}(order: OrderStatusUpdateInput!): OrderOutput
    ${SUBSCRIPTIONS.DELIVER_ORDER_BY_ID}(orderId: ID!): FoodOutput
    ${SUBSCRIPTIONS.RECEIVE_ORDER_BY_ID}(orderId: ID!): FoodOutput
    ${SUBSCRIPTIONS.START_COOKING_FOOD}(orderId: ID!): OrderOutput
    ${SUBSCRIPTIONS.CREATE_ORDER}(order: OrderInput!): OrderOutput
    ${SUBSCRIPTIONS.ATTACH_ORDER}(orderId: ID!): CourierOutput
    ${SUBSCRIPTIONS.ATTACH_ORDER_TO_COURIER}(orderId: ID!, courierId: ID!): CourierOutput
  }
`;
