import { PaginateProps } from 'src/props/paginate.props';

export type GetAllFoodsProps = {
  name?: string;
  category?: string;
} & PaginateProps;
