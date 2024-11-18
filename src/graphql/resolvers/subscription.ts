import { resolversHandlers } from 'src/common';
import { Subscription } from 'src/common/resolver/resolver.type';
import { EVENTS } from 'src/constants/events';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import { pubsub } from '..';

export const subscription = resolversHandlers(SUBSCRIPTIONS)<Subscription>({
  UPDATE_ORDER_STATUS_BY_ID: {
    subscribe: () => {
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS]);
    },
  },
  DELIVER_ORDER_BY_ID: {
    subscribe: () => {
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS]);
    },
  },
  RECEIVE_ORDER_BY_ID: {
    subscribe: () => {
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS]);
    },
  },
  START_COOKING_FOOD: {
    subscribe: () => {
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS]);
    },
  },
  CREATE_ORDER: {
    subscribe: () => {
      return pubsub.asyncIterator([EVENTS.CREATE_ORDER]);
    },
  },
  ATTACH_ORDER: {
    subscribe: () => {
      return pubsub.asyncIterator([EVENTS.ATTACH_ORDER]);
    },
  },
  ATTACH_ORDER_TO_COURIER: {
    subscribe: () => {
      return pubsub.asyncIterator([EVENTS.ATTACH_ORDER]);
    },
  },
});
