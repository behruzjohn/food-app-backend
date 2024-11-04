import { ApolloError } from 'apollo-server-core';
import { PubSub } from 'graphql-subscriptions';
import { EVENTS } from 'src/constants/events';
import { MUTATIONS } from 'src/constants/mutations';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import { StatusEnum } from 'src/enums/status.enum';
import { Context } from 'src/types/context';
import { User } from '../user/user.model';
import { Order } from './order.model';
import { OrderOutput } from './outputs/order.output';
import { OrderMessageOutput } from './outputs/orderMessage.output';
import { CreateOrderProps } from './props/createOrderProps';
import { GetOrderByIdProps } from './props/getOrderProps';
import { OrderChangeStatus } from './props/orderChangeStatus.props';
import { UpdateOrderProps } from './props/updateOrderProps';
export const pubsub = new PubSub();

export const createOrder = async (
  { order }: CreateOrderProps,
  { user }: Context,
): Promise<OrderMessageOutput> => {
  try {
    const createdOrder = await Order.create(order);
    const foundUser = await User.findById(user.id);

    if (!createdOrder) {
      throw new ApolloError('Order not created!');
    }
    const message = { user: foundUser, order: createdOrder };

    pubsub.publish(EVENTS.CREATE_ORDER, { [MUTATIONS.CREATE_ORDER]: message });

    return { payload: message };
  } catch (error) {
    throw new ApolloError('Error during creating order!');
  }
};

export const getOrderById = async ({
  orderId,
}: GetOrderByIdProps): Promise<OrderOutput> => {
  try {
    const foundOrder = await Order.findById(orderId);
    if (!foundOrder) {
      throw new ApolloError('Order not found');
    }

    return { payload: foundOrder };
  } catch (error) {
    throw new ApolloError('Error during getting the order');
  }
};

export const updateOrderStatusById = async ({
  id,
  food,
}: UpdateOrderProps): Promise<OrderOutput> => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: StatusEnum.cooking },
      { new: true },
    );
    if (!updatedOrder) {
      throw new ApolloError('Order not found!');
    }
    return { payload: updatedOrder };
  } catch (error) {
    throw new ApolloError('Error during updating order');
  }
};

export const deliverOrderById = async ({
  orderId,
  user,
}: OrderChangeStatus): Promise<OrderMessageOutput> => {
  try {
    const foundOrderById = await Order.findByIdAndUpdate(orderId, {
      status: StatusEnum.delivering,
    });

    const foundUser = await User.findById(user);

    const message = { user: foundUser, order: foundOrderById };

    pubsub.publish(EVENTS.DELIVER_ORDER_BY_ID, {
      [SUBSCRIPTIONS.UPDATE_ORDER_STATUS_BY_ID]: message,
    });

    return { payload: message };
  } catch (error) {
    throw new ApolloError('Error during finding!');
  }
};

export const receiveOrderById = async ({
  orderId,
  user,
}: OrderChangeStatus): Promise<OrderMessageOutput> => {
  try {
    const foundOrderById = await Order.findByIdAndUpdate(orderId, {
      status: StatusEnum.received,
    });

    const foundUser = await User.findById(user);

    const message = { user: foundUser, order: foundOrderById };

    pubsub.publish(EVENTS.DELIVER_ORDER_BY_ID, {
      [SUBSCRIPTIONS.UPDATE_ORDER_STATUS_BY_ID]: message,
    });

    return { payload: message };
  } catch (error) {
    throw new ApolloError('Error during finding!');
  }
};
