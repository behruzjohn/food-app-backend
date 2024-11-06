import { Types } from 'mongoose';

export interface OrderInput {
  foods: Types.ObjectId[];
}
