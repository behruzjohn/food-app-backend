import { subscriptions } from 'src/common';
import { EVENTS } from 'src/constants/events';
import * as orderService from 'src/modules/order/order.service';
import { UpdateOrderStatusProps } from 'src/modules/order/props/updateOrderProps';
import { GetOrderByIdProps } from 'src/modules/order/props/getOrderProps';
import { pubsub } from '..';

export const subscription = subscriptions({
  UPDATE_ORDER_STATUS_BY_ID: {
    subscribe: async (_, args: UpdateOrderStatusProps) => {
      await orderService.updateOrderStatusById(args);
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS_BY_ID]);
    },
  },

  DELIVER_ORDER_BY_ID: {
    subscribe: async (_, args: GetOrderByIdProps) => {
      await orderService.deliverOrderById(args);
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS_BY_ID]);
    },
  },

  RECEIVE_ORDER_BY_ID: {
    subscribe: async (_, args: GetOrderByIdProps) => {
      await orderService.receiveOrderById(args);
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS_BY_ID]);
    },
  },

  START_COOKING_FOOD: {
    subscribe: async (_, args: GetOrderByIdProps) => {
      await orderService.startCookingOrder(args);
      return pubsub.asyncIterator([EVENTS.UPDATE_ORDER_STATUS_BY_ID]);
    },
  },
});
