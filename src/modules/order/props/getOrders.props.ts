import { StatusEnum } from 'src/enums/status.enum';
import { PaginateProps } from 'src/props/paginate.props';

export type GetOrdersProps = {
  statuses?: StatusEnum[];
} & PaginateProps;
