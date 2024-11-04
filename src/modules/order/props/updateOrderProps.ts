import { Types } from 'mongoose';
import { OrderUpdateInput } from '../inputs/orderUpdate.input';

export type UpdateOrderProps = {
  id: Types.ObjectId;
  food: OrderUpdateInput;
};