import { Types } from 'mongoose';

export type GetUserOrderItemsProps = {
  userId: Types.ObjectId;
  orderId: Types.ObjectId;
};
