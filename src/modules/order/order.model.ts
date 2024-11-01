import { model, Schema } from 'mongoose';
import { MODELS } from '../../constants/models';
import { StatusEnum } from '../../enums/status.enum';

const orderSchema = new Schema({
  price: Number,
  createdAt: Date,
  discount: Number,
  status: { type: String, enum: Object.keys(StatusEnum) },
  food: { type: Schema.Types.ObjectId, ref: MODELS.FOOD },
  user: { type: Schema.Types.ObjectId, ref: MODELS.USER },
  from: { type: [Number, Number] },
  to: { type: [Number, Number] },
});

export const Order = model(MODELS.ORDER, orderSchema);
