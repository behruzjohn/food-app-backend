import { model, Schema, Types } from "mongoose";
import { MODELS } from "../../constants/models";
import { StatusEnum } from "../../enums/status.enum";

const orderSchema = new Schema({
  price: Number,
  createdAt: Date,
  discount: Number,
  status: {
    type: String,
    enum: Object.keys(StatusEnum),
    default: StatusEnum.cooking,
  },
  food: { type: Types.ObjectId, ref: MODELS.FOOD },
  user: { type: Types.ObjectId, ref: MODELS.USER },
  from: { type: [Number, Number] },
  to: { type: [Number, Number] },
});

export const Order = model(MODELS.ORDER, orderSchema);
