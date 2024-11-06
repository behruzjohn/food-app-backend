import { Types } from 'mongoose';
import { StatusEnum } from 'src/enums/status.enum';

export type UpdateOrderStatusProps = {
  orderId: Types.ObjectId;
  status: StatusEnum;
};
