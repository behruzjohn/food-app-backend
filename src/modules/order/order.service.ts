import { ApolloError, UserInputError } from 'apollo-server-core';
import { EVENTS } from 'src/constants/events';
import { MUTATIONS } from 'src/constants/mutations';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import { StatusEnum } from 'src/enums/status.enum';
import { pubsub } from 'src/graphql';
import { Context } from 'src/types/context';
import { Order } from './order.model';
import { OrderOutput } from './outputs/order.output';
import { CreateOrderProps } from './props/createOrder.props';
import { GetOrderByIdProps } from './props/getOrder.props';
import { UpdateOrderStatusProps } from './props/updateOrder.props';
import { getCartItemsByUserId } from '../cartItem/cartItem.service';

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
) => {
  const { payload } = await getCartItemsByUserId({ user });

  const createdOrder = await Order.create({
    createdBy: user._id,
    to: order.to,
    foods: payload.items.map((item) => item['_id']),
    totalPrice: payload.totalPrice,
  });

  const message = { payload: createdOrder };

  pubsub.publish(EVENTS.CREATE_ORDER, { [MUTATIONS.CREATE_ORDER]: message });
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
}: UpdateOrderStatusProps) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true },
  );

  if (!updatedOrder) {
    throw new ApolloError('Order not found!');
  }

  const message = { payload: updatedOrder };

  pubsub.publish(EVENTS.UPDATE_ORDER_STATUS_BY_ID, {
    [SUBSCRIPTIONS.DELIVER_ORDER_BY_ID]: message,
  });
};

export const deliverOrderById = async ({ orderId }: GetOrderByIdProps) => {
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

  const message = { payload: updatedOrder };

  pubsub.publish(EVENTS.UPDATE_ORDER_STATUS_BY_ID, {
    [SUBSCRIPTIONS.DELIVER_ORDER_BY_ID]: message,
  });
};

export const receiveOrderById = async ({ orderId }: GetOrderByIdProps) => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, {
    status: StatusEnum.received,
  });

  const message = { payload: updatedOrder };

  pubsub.publish(EVENTS.UPDATE_ORDER_STATUS_BY_ID, {
    [SUBSCRIPTIONS.RECEIVE_ORDER_BY_ID]: message,
  });
};
