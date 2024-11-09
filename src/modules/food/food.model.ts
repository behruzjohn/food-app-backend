import { model, Schema } from 'mongoose';
import { MODELS } from '../../constants/models';

const foodSchema = new Schema({
  image: { type: String },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number },
});

export const Food = model(MODELS.FOOD, foodSchema);
