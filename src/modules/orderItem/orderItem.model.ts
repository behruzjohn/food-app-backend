import { model, Schema, Types } from 'mongoose';
import { MODELS } from '../../constants/models';
import { OrderItemSchema } from './types/orderItem.type';

const orderItemSchema = new Schema<OrderItemSchema>(
  {
    food: { type: Types.ObjectId, ref: MODELS.FOOD },
    user: { type: Types.ObjectId, ref: MODELS.USER },
    price: { type: Number },
    quantity: { type: Number, default: 1, min: 1 },
    order: { type: Types.ObjectId, ref: MODELS.ORDER },
  },
  { timestamps: true },
);

export const OrderItem = model(MODELS.ORDER_ITEM, orderItemSchema);
