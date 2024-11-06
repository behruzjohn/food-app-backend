import { Order } from '../order.model';

export type OrderMessage = {
  order: typeof Order.schema.obj;
};
