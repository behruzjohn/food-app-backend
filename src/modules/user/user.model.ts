import { model, Schema } from "mongoose";
import { MODELS } from "../../constants/models";

const userSchema = new Schema({
  name: String,
  phone: { type: String, validator: (v: string) => v.startsWith("+998") },
});

export const User = model(MODELS.USER, userSchema);
