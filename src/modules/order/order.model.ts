import { model, Schema, Types } from 'mongoose';
import { MODELS } from '../../constants/models';
import { StatusEnum } from '../../enums/status.enum';

const orderSchema = new Schema({
  totalPrice: Number,
  createdAt: Date,
  status: {
    type: String,
    enum: Object.keys(StatusEnum),
    default: StatusEnum.cooking,
  },
  foods: [{ type: Types.ObjectId, ref: MODELS.CART_ITEM }],
  createdBy: { type: Types.ObjectId, ref: MODELS.USER },
  from: { type: [Number, Number] },
  to: { type: [Number, Number] },
});

export const Order = model(MODELS.ORDER, orderSchema);
