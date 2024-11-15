import { resolversHandlers } from 'src/common';
import { Subscription } from 'src/common/resolver/resolver.type';
import { EVENTS } from 'src/constants/events';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import { CreateOrderProps } from 'src/modules/order/props/createOrder.props';
import { GetOrderByIdProps } from 'src/modules/order/props/getOrder.props';
import { UpdateOrderStatusProps } from 'src/modules/order/props/updateOrder.props';
import { Context } from 'src/types/context';
import { pubsub } from '..';

export const subscription = resolversHandlers(SUBSCRIPTIONS)<Subscription>({
  UPDATE_ORDER_STATUS_BY_ID: {
    subscribe: async (_, args: UpdateOrderStatusProps) => {
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS_BY_ID]);
    },
  },
  DELIVER_ORDER_BY_ID: {
    subscribe: async (_, args: GetOrderByIdProps) => {
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS_BY_ID]);
    },
  },
  RECEIVE_ORDER_BY_ID: {
    subscribe: async (_, args: GetOrderByIdProps) => {
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS_BY_ID]);
    },
  },
  START_COOKING_FOOD: {
    subscribe: async (_, args: GetOrderByIdProps) => {
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS_BY_ID]);
    },
  },
  CREATE_ORDER: {
    subscribe: async (_, args: CreateOrderProps, context: Context) => {
      return pubsub.asyncIterator([EVENTS.CREATE_ORDER]);
    },
  },
  ATTACH_ORDER: {
    subscribe: async (_, args: GetOrderByIdProps, context: Context) => {
      return pubsub.asyncIterator([EVENTS.ATTACH_ORDER]);
    },
  },
});
