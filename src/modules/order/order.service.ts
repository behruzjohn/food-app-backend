import { ApolloError, UserInputError } from 'apollo-server-core';
import { RootFilterQuery } from 'mongoose';
import { BadRequestError } from 'src/common';
import { EVENTS } from 'src/constants/events';
import { POPULATIONS } from 'src/constants/populations';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import { StatusEnum } from 'src/enums/status.enum';
import { pubsub } from 'src/graphql';
import * as cartItemService from 'src/modules/cartItem/cartItem.service';
import { Context } from 'src/types/context';
import { Paginated } from 'src/types/paginated';
import { addCartItemToOrderItem } from '../orderItem/orderItem.service';
import { Order } from './order.model';
import { OrderOutput } from './outputs/order.output';
import { OrdersOutput } from './outputs/orders.output';
import { CreateOrderProps } from './props/createOrder.props';
import { GetOrderByIdProps } from './props/getOrder.props';
import { GetOrdersProps } from './props/getOrders.props';
import { GetOrdersByUserIdProps } from './props/getOrdersByUserId.props';
import { UpdateOrderStatusProps } from './props/updateOrder.props';

export const startCookingOrder = async ({ orderId }: GetOrderByIdProps) => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, {
    status: StatusEnum.cooking,
    cookedAt: new Date(),
  }).populate(POPULATIONS.order);

  if (!updatedOrder) {
    throw new UserInputError('Order is not found');
  }

  pubsub.publish(EVENTS.UPDATE_ORDER_STATUS, { payload: updatedOrder });
};

export const createOrder = async (
  { order }: CreateOrderProps,
  { user }: Context,
): Promise<OrderOutput> => {
  const { payload } = await cartItemService.getCartItemsByUserId({ user });
  const createdOrder = await Order.create({
    createdBy: user._id,
    address: order.address,
    totalPrice: payload.totalPrice,
  });
  await addCartItemToOrderItem({ userId: user._id, orderId: createdOrder._id });
  await cartItemService.clearUserCart({ user });

  const populatedOrder = await createdOrder.populate(POPULATIONS.order);

  const message = { payload: populatedOrder };

  pubsub.publish(EVENTS.CREATE_ORDER, {
    [SUBSCRIPTIONS.CREATE_ORDER]: message,
  });

  return { payload: createdOrder };
};

export const getOrderById = async ({
  orderId,
}: GetOrderByIdProps): Promise<OrderOutput> => {
  const foundOrder = await Order.findById(orderId).populate(POPULATIONS.order);

  if (!foundOrder) {
    throw new ApolloError('Order not found');
  }

  return { payload: foundOrder };
};

export const updateOrderStatusById = async ({
  orderId,
  status,
}: UpdateOrderStatusProps): Promise<OrderOutput> => {
  const orderStatus = {
    [StatusEnum.delivering]: 'cookedAt',
    [StatusEnum.received]: 'receivedAt',
  };

  const updateData = { status };

  if (orderStatus[status]) {
    updateData[orderStatus[status]] = new Date();
  }

  const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
    new: true,
  }).populate(POPULATIONS.order);

  if (!updatedOrder) {
    throw new ApolloError('Order not found!');
  }

  const message = { payload: updatedOrder };

  pubsub.publish(EVENTS.UPDATE_ORDER_STATUS, {
    [SUBSCRIPTIONS.DELIVER_ORDER_BY_ID]: message,
  });

  return { payload: updatedOrder };
};

export const deliverOrderById = async ({
  orderId,
}: GetOrderByIdProps): Promise<OrderOutput> => {
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      status: StatusEnum.delivering,
      cookedAt: new Date(),
    },
    { new: true },
  ).populate(POPULATIONS.order);

  if (!updatedOrder) {
    throw new UserInputError(`Order with id "${orderId}" is not found`);
  }

  const message = { payload: updatedOrder };

  pubsub.publish(EVENTS.UPDATE_ORDER_STATUS, {
    [SUBSCRIPTIONS.DELIVER_ORDER_BY_ID]: message,
  });
  return { payload: updatedOrder };
};

export const receiveOrderById = async ({
  orderId,
}: GetOrderByIdProps): Promise<OrderOutput> => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, {
    status: StatusEnum.received,
    receivedAt: new Date(),
  }).populate(POPULATIONS.order);

  const message = { payload: updatedOrder };

  pubsub.publish(EVENTS.UPDATE_ORDER_STATUS, {
    [SUBSCRIPTIONS.RECEIVE_ORDER_BY_ID]: message,
  });

  return { payload: updatedOrder };
};

export const startCookingFood = async ({
  orderId,
  status,
}: UpdateOrderStatusProps): Promise<OrderOutput> => {
  const changeStatus = await Order.findByIdAndUpdate(
    orderId,
    { status: status },
    {
      new: true,
    },
  );

  if (!changeStatus) {
    throw new BadRequestError('Order not found!');
  }

  return { payload: changeStatus };
};

export const getOrders = async ({
  statuses,
  limit,
  page,
}: GetOrdersProps): Promise<Paginated<OrdersOutput>> => {
  const filter: unknown = {};

  if (Array.isArray(statuses) && statuses.length) {
    filter['$or'] = statuses.map((status) => ({ status }));
  }

  const { docs: foundFoods, ...pagination } = await Order.find(filter)
    .populate(POPULATIONS.order)
    .paginate({ limit, page });

  return { payload: foundFoods, ...pagination };
};

export const getOrdersByUserId = async (
  { status }: GetOrdersByUserIdProps,
  { user }: Context,
): Promise<OrdersOutput> => {
  const statusCheck: RootFilterQuery<typeof Order> = {
    createdBy: user._id,
  };
  if (status !== 'All') {
    statusCheck.status = status;
  }

  const foundOrders = await Order.find(statusCheck).populate(POPULATIONS.order);

  return { payload: foundOrders };
};
