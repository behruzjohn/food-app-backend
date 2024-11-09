import { model, Schema } from 'mongoose';
import { MODELS } from '../../constants/models';

const cartItemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: MODELS.FOOD },
  quantity: { type: Number, min: 0 },
  price: { type: Number },
  discount: { type: Number, min: 0, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: MODELS.USER },
});

export const CartItem = model(MODELS.CART_ITEM, cartItemSchema);
