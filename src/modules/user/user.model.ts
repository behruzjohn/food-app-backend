import { model, Schema } from 'mongoose';
import { MODELS } from '../../constants/models';
import { UserRoleEnum } from 'src/enums/userRole.enum';

const userSchema = new Schema({
  photo: { type: String },
  name: { type: String, required: true },
  role: { type: String, enum: Object.keys(UserRoleEnum) },
  telegramId: { type: String },
  phone: { type: String, validator: (v: string) => v.startsWith('+998') },
  password: { type: String },
});

export const User = model(MODELS.USER, userSchema);
