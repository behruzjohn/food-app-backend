import { model, Schema } from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { MODELS } from '../../constants/models';

const foodSchema = new Schema({
  image: { type: String },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number },
  category: { type: String, ref: MODELS.CATEGORIES, required: true },
});

foodSchema.plugin(mongoosePaginateV2);

export const Food = model(MODELS.FOOD, foodSchema);
