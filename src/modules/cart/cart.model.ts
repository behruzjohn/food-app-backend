import { model, Schema } from 'mongoose';
import { MODELS } from '../../constants/models';

const cartSchema = new Schema({
  foods: {
    type: [{ type: Schema.Types.ObjectId, ref: MODELS.FOOD }],
    default: [],
  },
  user: { type: Schema.Types.ObjectId, ref: MODELS.USER },
});

export const Cart = model(MODELS.CART, cartSchema);
