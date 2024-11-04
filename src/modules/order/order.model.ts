import { model, Schema, Types } from "mongoose";
import { MODELS } from "../../constants/models";
import { StatusEnum } from "../../enums/status.enum";

const orderSchema = new Schema({
  food: {
    type: Schema.Types.ObjectId,
    ref: MODELS.FOOD,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: Number,
  user: { type: Types.ObjectId, ref: MODELS.USER },
  status: {
    type: String,
    enum: Object.keys(StatusEnum),
    default: StatusEnum.cooking,
  },
  createdAt: { type: Date, default: new Date() },
});

export const Order = model(MODELS.ORDER, orderSchema);
