import { model, Schema, Types } from 'mongoose';
import { MODELS } from '../../constants/models';
import { StatusEnum } from '../../enums/status.enum';

const orderSchema = new Schema({
  totalPrice: Number,
  createdAt: { type: Date, default: new Date() },
  status: {
    type: String,
    enum: Object.keys(StatusEnum),
    default: StatusEnum.pending,
  },
  foods: [{ type: Types.ObjectId, ref: MODELS.CART_ITEM }],
  createdBy: { type: Types.ObjectId, ref: MODELS.USER },
  to: { type: [Number, Number] },
  attachedFor: { type: Types.ObjectId, ref: MODELS.USER },
});

export const Order = model(MODELS.ORDER, orderSchema);
