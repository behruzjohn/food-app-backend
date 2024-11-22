import { model, Schema, Types } from 'mongoose';
import { MODELS } from '../../constants/models';

const orderItemSchema = new Schema(
  {
    food: { type: Types.ObjectId, ref: MODELS.FOOD },
    user: { type: Types.ObjectId, ref: MODELS.USER },
    price: { type: Number },
    quantity: { type: Number, default: 1, min: 1 },
  },
  { timestamps: true },
);

export const OrderItem = model(MODELS.ORDER_ITEM, orderItemSchema);
