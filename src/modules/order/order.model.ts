import { model, Schema, Types } from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { MODELS } from '../../constants/models';
import { StatusEnum } from '../../enums/status.enum';
import { OrderSchema } from './types/order.type';

const orderSchema = new Schema<OrderSchema>(
  {
    totalPrice: Number,
    status: {
      type: String,
      enum: Object.keys(StatusEnum),
      default: StatusEnum.pending,
    },
    createdBy: { type: Types.ObjectId, ref: MODELS.USER },
    address: { type: [Number, Number] },
    attachedFor: { type: Types.ObjectId, ref: MODELS.USER },
    cookedAt: { type: Date },
    receivedAt: { type: Date },
  },
  { timestamps: true },
);

orderSchema.plugin(mongoosePaginateV2);

export const Order = model(MODELS.ORDER, orderSchema);
