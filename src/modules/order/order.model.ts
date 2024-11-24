import { model, Schema, Types } from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
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
  address: { type: [Number, Number] },
  attachedFor: { type: Types.ObjectId, ref: MODELS.USER },
});

orderSchema.plugin(mongoosePaginateV2);

export const Order = model(MODELS.ORDER, orderSchema);
