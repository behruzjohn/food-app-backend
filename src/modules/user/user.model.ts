import { model, Schema } from "mongoose";
import { MODELS } from "../../constants/models";
import { RoleEnum } from "../../enums/role.enum";
import { TELEGRAM_ID_LENGTH } from "../../constants/validations";

const userSchema = new Schema({
  name: { type: String },
  orders: [{ type: Schema.Types.ObjectId }],
  telegramId: {
    type: Number,
    validator: (v: number) => v.toString().length === TELEGRAM_ID_LENGTH,
  },
  role: { type: String, enum: Object.keys(RoleEnum) },
  phone: { type: String, validator: (v: string) => v.startsWith("+998") },
  cart: { type: Schema.Types.ObjectId, ref: "Cart" },
});

export const User = model(MODELS.USER, userSchema);
