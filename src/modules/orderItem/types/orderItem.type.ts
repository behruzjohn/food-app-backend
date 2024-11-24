import { Types } from 'mongoose';

export type OrderItemProps = {
  userId: Types.ObjectId;
  orderId: Types.ObjectId;
};
