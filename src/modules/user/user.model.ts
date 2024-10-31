import { model, Schema } from 'mongoose';
import { MODELS } from '../../constants/models';
import { TELEGRAM_ID_LENGTH } from '../../constants/validations';
import { RoleEnum } from '../../enums/role.enum';

const userSchema = new Schema({
  name: { type: String },
  role: { type: String, enum: Object.keys(RoleEnum) },
  phone: { type: String, validator: (v: string) => v.startsWith('+998') },
  telegramId: {
    type: Number,
    validator: (v: number) => v.toString().length === TELEGRAM_ID_LENGTH,
  },
});

export const User = model(MODELS.USER, userSchema);
