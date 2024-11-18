import { attachOrder } from '../courier/courier.service';
import { CourierOutput } from '../courier/outputs/courier.output';
import { GetCourierByIdProps } from '../courier/props/getCourierById.props';
import { GetOrderByIdProps } from '../order/props/getOrder.props';
import { UserInputError } from 'apollo-server-core';
import { Courier } from '../courier/courier.model';
import { CreateCourierProps } from './props/createCourier.props';

export const attachOrderToCourier = async ({
  orderId,
  courierId,
}: GetOrderByIdProps & GetCourierByIdProps) => {
  return attachOrder({ orderId }, { user: { _id: courierId } });
};

export const createCourier = async ({
  data,
}: CreateCourierProps): Promise<CourierOutput> => {
  const foundCourier = await Courier.findOne({ phone: data.phone });

  if (foundCourier) {
    throw new UserInputError('Courier with this phone already exists');
  }

  const createdCourier = await Courier.create({
    name: data.name,
    phone: data.phone,
    password: data.password,
  });

  return { payload: createdCourier };
};
