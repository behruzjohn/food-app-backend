import { Types } from 'mongoose';
import { UpdateCategoryInput } from '../inputs/updateCategory.input';

export type UpdateCategoryProps = {
  categoryId: Types.ObjectId;
  category: UpdateCategoryInput;
};
