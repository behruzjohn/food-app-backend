import { Order } from "../order.model";

export type OrderOutput = {
  payload: typeof Order.schema.obj;
};
