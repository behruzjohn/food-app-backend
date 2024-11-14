import { model, Schema } from 'mongoose';
import { MODELS } from '../../constants/models';

const userSchema = new Schema({
  photo: { type: String },
  name: { type: String, required: true },
  phone: { type: String, validator: (v: string) => v.startsWith('+998') },
  password: { type: String },
});

export const User = model(MODELS.USER, userSchema);
