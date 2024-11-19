import { model, Schema, Types } from 'mongoose';
import { UserRoleEnum } from 'src/enums/userRole.enum';
import { MODELS } from '../../constants/models';

const userSchema = new Schema({
  photo: { type: String },
  name: { type: String, required: true },
  role: { type: String, enum: Object.keys(UserRoleEnum), default: MODELS.USER },
  telegramId: { type: String },
  phone: { type: String, validator: (v: string) => v.startsWith('+998') },
  favoriteFoods: [{ type: Types.ObjectId, ref: MODELS.FOOD }],
  password: { type: String },
});

export const User = model(MODELS.USER, userSchema);
