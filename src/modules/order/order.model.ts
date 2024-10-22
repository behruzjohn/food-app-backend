import { model, Schema } from "mongoose";
import { MODELS } from "../../constants/models";

const orderSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food" },
  price: Number,
  createdAt: new Date(),
  discount: Number,
});

export const Order = model(MODELS.ORDER, orderSchema);
