import { OrderItem } from '../orderItem.model';

export type OrderItemOutput = {
  payload: (typeof OrderItem.schema.obj)[];
};
