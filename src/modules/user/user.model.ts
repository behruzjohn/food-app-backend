import { model, Schema } from "mongoose";
import { MODELS } from "../../constants/models";
import { RoleEnum } from "../../enums/role.enum";
import { TELEGRAM_ID_LENGTH } from "../../constants/validations";

const userSchema = new Schema({
  name: String,
  telegramId: {
    type: Number,
    validator: (v: number) => v.toString().length === TELEGRAM_ID_LENGTH,
  },
  role: { type: String, enum: Object.keys(RoleEnum) },
  phone: { type: String, validator: (v: string) => v.startsWith("+998") },
});

export const User = model(MODELS.USER, userSchema);
