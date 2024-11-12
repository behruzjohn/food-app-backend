import { Courier } from '../courier.model';

export type CourierOutput = {
  payload: typeof Courier.schema.obj;
};
