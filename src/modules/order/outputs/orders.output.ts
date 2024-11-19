import { Order } from '../order.model';

export type OrdersOutput = {
  payload: (typeof Order.schema.obj)[];
};
