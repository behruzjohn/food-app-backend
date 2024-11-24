import { UserInputError } from 'apollo-server-core';
import { Courier } from '../courier/courier.model';
import { attachOrder } from '../courier/courier.service';
import { GetCourierByIdProps } from '../courier/props/getCourierById.props';
import { GetOrderByIdProps } from '../order/props/getOrder.props';
import { UserInputError } from 'apollo-server-core';
import { CreateCourierProps } from './props/createCourier.props';
import { User } from '../user/user.model';
import { RoleEnum } from 'src/enums/role.enum';
import { UserOutput } from '../user/outputs/user.output';
import { Courier } from '../courier/courier.model';

export const attachOrderToCourier = async ({
  orderId,
  courierId,
}: GetOrderByIdProps & GetCourierByIdProps) => {
  return attachOrder({ orderId }, { user: { _id: courierId } });
};

export const createCourier = async ({
  userId,
}: CreateCourierProps): Promise<UserOutput> => {
  const updatedUser = await User.findByIdAndUpdate(userId, {
    role: RoleEnum.courier,
  });

  if (!updatedUser) {
    throw new UserInputError('User not found');
  }

  await Courier.create({ user: updatedUser._id });

  return { payload: updatedUser };
};
