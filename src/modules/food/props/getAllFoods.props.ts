import { Types } from 'mongoose';
import { PaginateProps } from 'src/props/paginate.props';

export type GetAllFoodsProps = {
  name?: string;
  categories: Types.ObjectId[];
} & PaginateProps;
