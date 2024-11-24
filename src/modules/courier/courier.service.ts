import { UserInputError } from 'apollo-server-core';
import { EVENTS } from 'src/constants/events';
import { pubsub } from 'src/graphql';
import { Context } from 'src/types/context';
import { Order } from '../order/order.model';
import { GetOrderByIdProps } from '../order/props/getOrder.props';
import { Courier } from './courier.model';
import { CourierOutput } from './outputs/courier.output';
import { CouriersOutput } from './outputs/couriers.output';
import { GetCouriersProps } from './props/getCourier.props';
import { GetCourierByIdProps } from './props/getCourierById.props';

export const getCouriers = async ({
  name,
  phone,
}: GetCouriersProps): Promise<CouriersOutput> => {
  const couriers = await Courier.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $match: {
        $or: [{ 'user.name': name }, { 'user.phone': phone }],
      },
    },
  ]);

  return { payload: couriers };
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
