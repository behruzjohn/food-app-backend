import { ApolloError } from 'apollo-server-core';
import { EVENTS } from 'src/constants/events';
import { MUTATIONS } from 'src/constants/mutations';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import { StatusEnum } from 'src/enums/status.enum';
import { pubsub } from 'src/graphql';
import { Context } from 'src/types/context';
import { User } from '../user/user.model';
import { Order } from './order.model';
import { OrderOutput } from './outputs/order.output';
import { OrderMessageOutput } from './outputs/orderMessage.output';
import { CreateOrderProps } from './props/createOrderProps';
import { GetOrderByIdProps } from './props/getOrderProps';
import { OrderChangeStatusProps } from './props/orderChangeStatus.props';
import { UpdateOrderProps } from './props/updateOrderProps';

export const createOrder = async (
  { order }: CreateOrderProps,
  { user }: Context,
): Promise<OrderMessageOutput> => {
  const createdOrder = await Order.create(order);
  const foundUser = await User.findById(user._id);

  if (!createdOrder) {
    throw new ApolloError('Order not created!');
  }
  const message = { user: foundUser, order: createdOrder };

  pubsub.publish(EVENTS.CREATE_ORDER, { [MUTATIONS.CREATE_ORDER]: message });

  return { payload: message };
};

export const getOrderById = async ({
  orderId,
}: GetOrderByIdProps): Promise<OrderOutput> => {
  const foundOrder = await Order.findById(orderId);

  if (!foundOrder) {
    throw new ApolloError('Order not found');
  }

  return { payload: foundOrder };
};

export const updateOrderStatusById = async ({
  id,
}: UpdateOrderProps): Promise<OrderOutput> => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status: StatusEnum.cooking },
    { new: true },
  );

  if (!updatedOrder) {
    throw new ApolloError('Order not found!');
  }

  return { payload: updatedOrder };
};

export const deliverOrderById = async ({
  orderId,
  user,
}: OrderChangeStatusProps): Promise<OrderMessageOutput> => {
  const foundOrderById = await Order.findByIdAndUpdate(orderId, {
    status: StatusEnum.delivering,
  });

  const foundUser = await User.findById(user);

  const message = { user: foundUser, order: foundOrderById };

  pubsub.publish(EVENTS.DELIVER_ORDER_BY_ID, {
    [SUBSCRIPTIONS.UPDATE_ORDER_STATUS_BY_ID]: message,
  });

  return { payload: message };
};

export const receiveOrderById = async ({
  orderId,
  user,
}: OrderChangeStatusProps): Promise<OrderMessageOutput> => {
  const foundOrderById = await Order.findByIdAndUpdate(orderId, {
    status: StatusEnum.received,
  });

  const foundUser = await User.findById(user);

  const message = { user: foundUser, order: foundOrderById };

  pubsub.publish(EVENTS.DELIVER_ORDER_BY_ID, {
    [SUBSCRIPTIONS.UPDATE_ORDER_STATUS_BY_ID]: message,
  });

  return { payload: message };
};
