import { gql } from 'apollo-server-core';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';

export const subscriptionType = gql`
  type Subscription {
    ${SUBSCRIPTIONS.UPDATE_ORDER_STATUS_BY_ID}: OrderOutput
    ${SUBSCRIPTIONS.DELIVER_ORDER_BY_ID}: FoodOutput
    ${SUBSCRIPTIONS.RECEIVE_ORDER_BY_ID}: FoodOutput
    ${SUBSCRIPTIONS.START_COOKING_FOOD}: OrderOutput
    ${SUBSCRIPTIONS.CREATE_ORDER}: OrderOutput
    ${SUBSCRIPTIONS.ATTACH_ORDER}: CourierOutput
    ${SUBSCRIPTIONS.ATTACH_ORDER_TO_COURIER}: CourierOutput
  }
`;
