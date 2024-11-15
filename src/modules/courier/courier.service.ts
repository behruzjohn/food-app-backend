import { UserInputError } from 'apollo-server-core';
import { EVENTS } from 'src/constants/events';
import { UserRoleEnum } from 'src/enums/role.enum';
import { pubsub } from 'src/graphql';
import { Context } from 'src/types/context';
import { Order } from '../order/order.model';
import { GetOrderByIdProps } from '../order/props/getOrder.props';
import { GetUserByIdProps } from '../user/props/getUserById.props';
import { User } from '../user/user.model';
import { Courier } from './courier.model';
import { CourierOutput } from './outputs/courier.output';
import { CouriersOutput } from './outputs/couriers.output';
import { GetCourierByIdProps } from './props/getCourierById.props';

export const getAllCouriers = async (): Promise<CouriersOutput> => {
  const foundCouriers = await Courier.find();

  return { payload: foundCouriers };
};

export const createCourier = async ({
  userId,
}: GetUserByIdProps): Promise<CourierOutput> => {
  const updatedUser = await User.findByIdAndUpdate(userId, {
    role: UserRoleEnum.courier,
  });

  if (!updatedUser) {
    throw new UserInputError('User not found');
  }

  const createdCourier = await Courier.create({
    user: updatedUser._id,
  });

  return { payload: createdCourier };
};

export const deleteCourierById = async ({
  courierId,
}: GetCourierByIdProps): Promise<CourierOutput> => {
  const deletedCourier = await Courier.findByIdAndDelete(courierId);

  return { payload: deletedCourier };
};

export const attachOrder = async (
  { orderId }: GetOrderByIdProps,
  { user }: Context,
): Promise<CourierOutput> => {
  const foundCourier = await Courier.findOne({ user: user._id });

  if (!foundCourier) {
    throw new UserInputError('Courier not found');
  }

  const foundOrder = await Order.findById(orderId);

  if (!foundOrder) {
    throw new UserInputError('Order not found');
  }

  foundOrder.attachedFor = <any>user._id;

  if (!foundCourier.orders.includes(<any>orderId)) {
    foundCourier.orders.push(orderId);
  }

  await foundCourier.save();
  await foundOrder.save();

  await pubsub.publish(EVENTS.ATTACH_ORDER, { payload: foundCourier });

  return { payload: foundCourier };
};
