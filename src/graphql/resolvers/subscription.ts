import { subscriptions } from 'src/common';
import { EVENTS } from 'src/constants/events';
import * as orderService from 'src/modules/order/order.service';
import { OrderChangeStatusProps } from 'src/modules/order/props/orderChangeStatus.props';
import { UpdateOrderProps } from 'src/modules/order/props/updateOrderProps';
import { pubsub } from '..';

export const subscription = subscriptions({
  UPDATE_ORDER_STATUS_BY_ID: {
    subscribe: (_, args: UpdateOrderProps) => {
      return orderService.updateOrderStatusById(args);
    },
  },

  DELIVER_ORDER_BY_ID: {
    subscribe: (_, args: OrderChangeStatusProps) => {
      return orderService.deliverOrderById(args);
    },
  },

  RECEIVE_ORDER_BY_ID: {
    subscribe: (_, args: OrderChangeStatusProps) => {
      return orderService.receiveOrderById(args);
    },
  },

  START_COOKING_FOOD: {
    subscribe: () => {
      return pubsub.asyncIterator([EVENTS.CREATE_ORDER]);
    },
  },
});
