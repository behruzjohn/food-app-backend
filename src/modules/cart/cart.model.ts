import { model, Schema } from 'mongoose';
import { MODELS } from '../../constants/models';

const cartItemSchema = new Schema({
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  food: { type: Schema.Types.ObjectId, ref: MODELS.FOOD },
  user: { type: Schema.Types.ObjectId, ref: MODELS.USER },
});

export const Cart = model(MODELS.CART, cartItemSchema);
