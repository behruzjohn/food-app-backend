import { model, Schema, Types } from 'mongoose';
import { MODELS } from 'src/constants/models';

const courierSchema = new Schema({
  user: { type: Types.ObjectId, ref: MODELS.USER },
  orders: [{ type: Types.ObjectId, ref: MODELS.ORDER, default: [] }],
});

export const Courier = model(MODELS.COURIER, courierSchema);
