import { Types } from 'mongoose';
import { StatusEnum } from 'src/enums/status.enum';
import { OrderItemSchema } from 'src/modules/orderItem/types/orderItem.type';

export type OrderSchema = {
  _id: Types.ObjectId;
  totalPrice: number;
  status: StatusEnum;
  address: [number, number];
  orderItems?: OrderItemSchema[];
  createdBy: typeof Types.ObjectId | Types.ObjectId;
  attachedFor: typeof Types.ObjectId | Types.ObjectId;
  cookedAt: Date;
  receivedAt: Date;
};
