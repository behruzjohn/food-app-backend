import { model, Schema } from 'mongoose';
import { MODELS } from '../../constants/models';
import { TELEGRAM_ID_LENGTH } from '../../constants/validations';
import { UserRoleEnum } from '../../enums/role.enum';

const userSchema = new Schema({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: Object.keys(UserRoleEnum),
    default: UserRoleEnum.user,
  },
  phone: { type: String, validator: (v: string) => v.startsWith('+998') },
  telegramId: {
    type: Number,
    validator: (v: number) => v.toString().length === TELEGRAM_ID_LENGTH,
  },
});

export const User = model(MODELS.USER, userSchema);
