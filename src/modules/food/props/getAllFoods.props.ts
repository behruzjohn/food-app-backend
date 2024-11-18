import { Types } from 'mongoose';

export type GetAllFoodsProps = {
  name?: string;
  categories: Types.ObjectId[];
};
