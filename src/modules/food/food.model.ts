import { model, Schema, Types } from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { MODELS } from '../../constants/models';

const foodSchema = new Schema({
  image: { type: String },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number },
  categories: [{ type: Types.ObjectId, ref: MODELS.CATEGORY, required: true }],
  likes: { type: Number, default: 0, min: 0 },
});

foodSchema.plugin(mongoosePaginateV2);

export const Food = model(MODELS.FOOD, foodSchema);
