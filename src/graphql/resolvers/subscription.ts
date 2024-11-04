import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import * as orderService from 'src/modules/order/order.service';
import { GetOrderByIdProps } from 'src/modules/order/props/getOrderProps';
import { OrderChangeStatus } from 'src/modules/order/props/orderChangeStatus.props';
import { UpdateOrderProps } from 'src/modules/order/props/updateOrderProps';
import { Resolvers } from 'src/types/resolvers';

export const subscription: Resolvers = {
  [SUBSCRIPTIONS.UPDATE_ORDER_STATUS_BY_ID]: (_, args: UpdateOrderProps) => {
    return orderService.updateOrderStatusById(args);
  },

  [SUBSCRIPTIONS.DELIVER_ORDER_BY_ID]: (_, args: OrderChangeStatus) => {
    return orderService.deliverOrderById(args);
  },

  [SUBSCRIPTIONS.RECEIVE_ORDER_BY_ID]: (_, args: OrderChangeStatus) => {
    return orderService.receiveOrderById(args);
  },
};
