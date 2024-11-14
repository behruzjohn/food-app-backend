import { model, Schema, Types } from 'mongoose';
import { MODELS } from 'src/constants/models';
import bcrypt from 'bcrypt';

const courierSchema = new Schema({
  name: { String },
  phone: { type: String, validator: (v: string) => v.startsWith('+998') },
  password: { type: String },
  orders: [{ type: Types.ObjectId, ref: MODELS.ORDER, default: [] }],
});

courierSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const Courier = model(MODELS.COURIERS, courierSchema);
