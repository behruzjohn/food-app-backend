import { model, Schema } from "mongoose";
import { MODELS } from "../../constants/models";

const foodSchema = new Schema({
  food: { type: String },
  description: { type: String },
  price: { type: Number },
  discount: { type: Number },
});

export const Order = model(MODELS.FOOD, foodSchema);
