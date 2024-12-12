import { ApolloError, UserInputError } from 'apollo-server-core';
import { RootFilterQuery } from 'mongoose';
import { BadRequestError } from 'src/common';
import { EVENTS } from 'src/constants/events';
import { POPULATIONS } from 'src/constants/populations';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import { StatusEnum } from 'src/enums/status.enum';
import { pubsub } from 'src/configs/graphql';
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
import { OrderSchema } from './types/order.type';
import * as orderItemService from 'src/modules/orderItem/orderItem.service';

export const startCookingOrder = async ({ orderId }: GetOrderByIdProps) => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, {
    status: StatusEnum.cooking,
    cookedAt: new Date(),
  }).populate(POPULATIONS.order);

  if (!updatedOrder) {
    throw new UserInputError('Order is not found');
  }

  await pubsub.publish(EVENTS.UPDATE_ORDER_STATUS, { payload: updatedOrder });
};

export const createOrder = async (
  { order }: CreateOrderProps,
  { user }: Context,
): Promise<OrderOutput> => {
  try {
    const { payload: foundCartItems } =
      await cartItemService.getCartItemsByUserId({ user });

    if (!foundCartItems.items.length) {
      throw new UserInputError('There are no cart items created yet');
    }

    const createdOrder = await Order.create({
      createdBy: user._id,
      address: order.address,
      totalPrice: foundCartItems.totalPrice,
    });

    const { payload: createdOrderItems } = await addCartItemToOrderItem({
      userId: user._id,
      orderId: createdOrder._id,
    });

    await cartItemService.clearUserCart({ user });

    const populatedOrder = await createdOrder.populate(POPULATIONS.order);

    const message = { payload: populatedOrder };

    await pubsub.publish(EVENTS.CREATE_ORDER, {
      [SUBSCRIPTIONS.CREATE_ORDER]: message,
    });

    return { payload: { ...createdOrder, orderItems: createdOrderItems } };
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async ({
  orderId,
}: GetOrderByIdProps): Promise<OrderOutput> => {
  const [foundOrder] = await Order.aggregate<OrderSchema>([
    {
      $match: { _id: orderId },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdBy',
      },
    },
    {
      $unwind: {
        path: '$createdBy',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'orderitems',
        localField: '_id',
        foreignField: 'order',
        as: 'orderItems',
      },
    },
    {
      $project: {
        _id: 1,
        totalPrice: 1,
        status: 1,
        address: 1,
        orderItems: 1,
        createdBy: 1,
      },
    },
  ]);

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
  });

  if (!updatedOrder) {
    throw new ApolloError('Order not found!');
  }

  const { payload: orderItems } = await orderItemService.getOrderItemsByOrderId(
    { orderId },
  );

  updatedOrder.orderItems = orderItems;

  const message = { payload: updatedOrder };

  await pubsub.publish(EVENTS.UPDATE_ORDER_STATUS, {
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

  const { payload: orderItems } = await orderItemService.getOrderItemsByOrderId(
    { orderId },
  );

  updatedOrder.orderItems = orderItems;

  const message = { payload: updatedOrder };

  await pubsub.publish(EVENTS.UPDATE_ORDER_STATUS, {
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

  if (!updatedOrder) {
    throw new UserInputError(`Order with id "${orderId}" is not found`);
  }

  const { payload: orderItems } = await orderItemService.getOrderItemsByOrderId(
    { orderId },
  );

  updatedOrder.orderItems = orderItems;

  const message = { payload: updatedOrder };

  await pubsub.publish(EVENTS.UPDATE_ORDER_STATUS, {
    [SUBSCRIPTIONS.RECEIVE_ORDER_BY_ID]: message,
  });

  return { payload: updatedOrder };
};

export const startCookingFood = async ({
  orderId,
  status,
}: UpdateOrderStatusProps): Promise<OrderOutput> => {
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status: status },
    {
      new: true,
    },
  );

  if (!updatedOrder) {
    throw new BadRequestError('Order not found!');
  }

  const { payload: orderItems } = await orderItemService.getOrderItemsByOrderId(
    { orderId },
  );

  updatedOrder.orderItems = orderItems;

  return { payload: updatedOrder };
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

  const aggregationPipeline = [
    { $match: filter },
    {
      $lookup: {
        from: 'orderitems',
        localField: '_id',
        foreignField: 'order',
        as: 'orderItems',
      },
    },
    {
      $project: {
        _id: 1,
        status: 1,
        totalPrice: 1,
        createdBy: 1,
        address: 1,
        attachedFor: 1,
        cookedAt: 1,
        receivedAt: 1,
        orderItems: { $ifNull: ['$orderItems', []] },
        createdAt: 1,
        updatedAt: 1,
      },
    },
    {
      $unwind: {
        path: '$orderItems',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'foods',
        localField: 'orderItems.food',
        foreignField: '_id',
        as: 'orderItems.food',
      },
    },
    {
      $addFields: {
        'orderItems.food': { $arrayElemAt: ['$orderItems.food', 0] },
      },
    },
    {
      $group: {
        _id: '$_id',
        status: { $first: '$status' },
        totalPrice: { $first: '$totalPrice' },
        createdBy: { $first: '$createdBy' },
        address: { $first: '$address' },
        attachedFor: { $first: '$attachedFor' },
        cookedAt: { $first: '$cookedAt' },
        receivedAt: { $first: '$receivedAt' },
        orderItems: { $push: '$orderItems' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' },
      },
    },
    { $skip: limit * (page - 1) },
    { $limit: limit },
    {
      $project: {
        _id: 1,
        status: 1,
        totalPrice: 1,
        createdBy: 1,
        address: 1,
        attachedFor: 1,
        cookedAt: 1,
        receivedAt: 1,
        orderItems: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ];

  const result = await Order.aggregate(aggregationPipeline);

  const totalCount = await Order.countDocuments(filter);
  const totalPages = Math.ceil(totalCount / limit);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  return {
    payload: result,
    page,
    limit,
    totalDocs: totalCount,
    totalPages,
    offset: limit * (page - 1),
    hasPrevPage,
    hasNextPage,
    prevPage: hasPrevPage ? page - 1 : null,
    nextPage: hasNextPage ? page + 1 : null,
  };
};

export const getOrdersByUserId = async (
  { status }: GetOrdersByUserIdProps,
  { user }: Context,
): Promise<OrdersOutput> => {
  const statusCheck: RootFilterQuery<typeof Order> = {
    createdBy: user._id,
  };

  if (status && status !== 'All') {
    statusCheck.status = status;
  }

  const aggregationPipeline = [
    { $match: { createdBy: user._id } },
    {
      $lookup: {
        from: 'orderitems',
        localField: '_id',
        foreignField: 'order',
        as: 'orderItems',
      },
    },
    {
      $project: {
        _id: 1,
        status: 1,
        totalPrice: 1,
        createdBy: 1,
        address: 1,
        attachedFor: 1,
        cookedAt: 1,
        receivedAt: 1,
        orderItems: { $ifNull: ['$orderItems', []] },
        createdAt: 1,
        updatedAt: 1,
      },
    },
    {
      $unwind: {
        path: '$orderItems',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'foods',
        localField: 'orderItems.food',
        foreignField: '_id',
        as: 'orderItems.food',
      },
    },
    {
      $addFields: {
        'orderItems.food': { $arrayElemAt: ['$orderItems.food', 0] },
      },
    },
    {
      $group: {
        _id: '$_id',
        status: { $first: '$status' },
        totalPrice: { $first: '$totalPrice' },
        createdBy: { $first: '$createdBy' },
        address: { $first: '$address' },
        attachedFor: { $first: '$attachedFor' },
        cookedAt: { $first: '$cookedAt' },
        receivedAt: { $first: '$receivedAt' },
        orderItems: { $push: '$orderItems' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' },
      },
    },
    {
      $project: {
        _id: 1,
        status: 1,
        totalPrice: 1,
        createdBy: 1,
        address: 1,
        attachedFor: 1,
        cookedAt: 1,
        receivedAt: 1,
        orderItems: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ];

  const foundOrders = await Order.aggregate<OrderSchema>(aggregationPipeline);

  return { payload: foundOrders };
};
