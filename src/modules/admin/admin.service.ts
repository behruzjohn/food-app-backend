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
import { OrderItem } from '../orderItem/orderItem.model';
import { CourierOutput } from '../courier/outputs/courier.output';

export const attachOrderToCourier = async ({
  orderId,
  courierId,
}: GetOrderByIdProps & GetCourierByIdProps) => {
  return attachOrder({ orderId }, { user: { _id: courierId } });
};

export const createCourier = async ({
  userId,
}: CreateCourierProps): Promise<CourierOutput> => {
  const updatedUser = await User.findByIdAndUpdate(userId, {
    role: RoleEnum.courier,
  });

  if (!updatedUser) {
    throw new UserInputError('User not found');
  }

  const createdCourier = await Courier.create({ user: updatedUser._id });

  return {
    payload: { ...createdCourier, user: <any>updatedUser },
  };
};

export async function getReceivedOrdersDashboard() {
  const pipeline: Parameters<typeof OrderItem.aggregate>['0'] = [
    {
      $lookup: {
        from: 'foods',
        localField: 'food',
        foreignField: '_id',
        as: 'foodDetails',
      },
    },

    { $unwind: '$foodDetails' },

    {
      $group: {
        _id: '$food',
        name: { $first: '$foodDetails.name' },
        totalSold: { $sum: '$quantity' },
        totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
      },
    },

    { $sort: { totalSold: -1 } },
  ];

  const receivedOrders = await OrderItem.aggregate(pipeline);

  return { payload: receivedOrders };
}

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
};
