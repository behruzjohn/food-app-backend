import { model, Schema } from "mongoose";
import { MODELS } from "../../constants/models";
import { RoleEnum } from "../../enums/role.enum";

const userSchema = new Schema({
  name: String,
  orders: [{ type: Schema.Types.ObjectId }],
  role: { type: String, enum: Object.keys(RoleEnum) },
  phone: { type: String, validator: (v: string) => v.startsWith("+998") },
  cart: { type: Schema.Types.ObjectId, ref: "Cart" },
});

export const User = model(MODELS.USER, userSchema);
