import { Types } from 'mongoose';

export type OrderChangeStatus = {
  orderId: Types.ObjectId;
  user: Types.ObjectId;
};
