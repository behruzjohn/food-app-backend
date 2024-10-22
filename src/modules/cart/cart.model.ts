import { model, Schema } from "mongoose";
import { MODELS } from "../../constants/models";
import { StatusEnum } from "../../enums/status.enum";

const cartSchema = new Schema({
  foods: [{ type: Schema.Types.ObjectId, ref: "Food" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: Object.keys(StatusEnum) },
});

export const Cart = model(MODELS.CART, cartSchema);
