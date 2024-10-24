import { model, Schema } from "mongoose";
import { MODELS } from "../../constants/models";
import { StatusEnum } from "../../enums/status.enum";

const orderSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food" },
  price: Number,
  discount: Number,
  status: { type: String, enum: Object.keys(StatusEnum) },
  createdAt: new Date(),
});

export const Order = model(MODELS.ORDER, orderSchema);
