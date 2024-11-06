import { Types } from 'mongoose';

export type OrderChangeStatusProps = {
  orderId: Types.ObjectId;
  user: Types.ObjectId;
};
