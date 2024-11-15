import { PaginateProps } from 'src/props/paginate.props';
import { Order } from '../order.model';

export type GetOrdersByStatusProps = {
  status: typeof Order.schema.obj.status;
} & PaginateProps;
