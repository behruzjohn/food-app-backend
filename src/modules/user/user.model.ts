import { model, Schema } from 'mongoose';
import { MODELS } from '../../constants/models';
import { UserRoleEnum } from '../../enums/role.enum';

const userSchema = new Schema({
  photo: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: Object.keys(UserRoleEnum),
    default: UserRoleEnum.user,
  },
  phone: { type: String, validator: (v: string) => v.startsWith('+998') },
  telegramId: { type: String },
});

export const User = model(MODELS.USER, userSchema, 'users');
