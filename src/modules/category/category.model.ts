import { model, Schema } from 'mongoose';
import { MODELS } from 'src/constants/models';

const categorySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const Category = model(MODELS.CATEGORY, categorySchema);
export default Category;
