import { ApolloError, UserInputError } from 'apollo-server-core';
import { EVENTS } from 'src/constants/events';
import { MUTATIONS } from 'src/constants/mutations';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import { StatusEnum } from 'src/enums/status.enum';
import { pubsub } from 'src/graphql';
import { Context } from 'src/types/context';
import { Order } from './order.model';
import { OrderOutput } from './outputs/order.output';
import { OrderMessageOutput } from './outputs/orderMessage.output';
import { CreateOrderProps } from './props/createOrderProps';
import { GetOrderByIdProps } from './props/getOrderProps';
import { UpdateOrderStatusProps } from './props/updateOrderProps';

export const startCookingOrder = async ({ orderId }: GetOrderByIdProps) => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, {
    status: StatusEnum.cooking,
  });

  if (!updatedOrder) {
    throw new UserInputError('Order is not found');
  }

  pubsub.publish(EVENTS.UPDATE_ORDER_STATUS_BY_ID, { payload: updatedOrder });
};

export const createOrder = async (
  { order }: CreateOrderProps,
  { user }: Context,
): Promise<OrderMessageOutput> => {
  const createdOrder = await Order.create(order);

  const message = { order: createdOrder, user: user._id };

  pubsub.publish(EVENTS.CREATE_ORDER, { [MUTATIONS.CREATE_ORDER]: message });

  return { payload: 'message' as any };
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
  orderId,
  status,
}: UpdateOrderStatusProps): Promise<OrderMessageOutput> => {
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true },
  );

  if (!updatedOrder) {
    throw new ApolloError('Order not found!');
  }

  const message = { order: updatedOrder };

  pubsub.publish(EVENTS.UPDATE_ORDER_STATUS_BY_ID, {
    [SUBSCRIPTIONS.DELIVER_ORDER_BY_ID]: message,
  });

  return { payload: message };
};

export const deliverOrderById = async ({
  orderId,
}: GetOrderByIdProps): Promise<OrderMessageOutput> => {
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      status: StatusEnum.delivering,
    },
    { new: true },
  );

  if (!updatedOrder) {
    throw new UserInputError(`Order with id "${orderId}" is not found`);
  }

  const message = { order: updatedOrder };

  pubsub.publish(EVENTS.UPDATE_ORDER_STATUS_BY_ID, {
    [SUBSCRIPTIONS.DELIVER_ORDER_BY_ID]: message,
  });

  return { payload: message };
};

export const receiveOrderById = async ({
  orderId,
}: GetOrderByIdProps): Promise<OrderMessageOutput> => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, {
    status: StatusEnum.received,
  });

  const message = { order: updatedOrder };

  pubsub.publish(EVENTS.UPDATE_ORDER_STATUS_BY_ID, {
    [SUBSCRIPTIONS.RECEIVE_ORDER_BY_ID]: message,
  });

  return { payload: message };
};
