import { UserInputError } from 'apollo-server-core';
import { RoleEnum } from 'src/enums/role.enum';
import { StatusEnum } from 'src/enums/status.enum';
import { Courier } from '../courier/courier.model';
import { attachOrder } from '../courier/courier.service';
import { GetCourierByIdProps } from '../courier/props/getCourierById.props';
import { Order } from '../order/order.model';
import { GetOrderByIdProps } from '../order/props/getOrder.props';
import { UserOutput } from '../user/outputs/user.output';
import { User } from '../user/user.model';
import { CreateCourierProps } from './props/createCourier.props';

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

const getLastMonth = (month = new Date()) => {
  const lastMonthDate = new Date(month);

  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

  return lastMonthDate;
};

export const getTotalSoldProducts = async () => {
  const calculateTotalProducts = await Order.aggregate([
    {
      $match: { status: StatusEnum.cooking },
    },
    {
      $group: {
        _id: null,
        totalSoldItems: { $sum: 1 },
        totalSoldItemsSum: { $sum: '$price' },
      },
    },
  ]);
  console.log(calculateTotalProducts);
};
