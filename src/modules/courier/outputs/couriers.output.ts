import { Courier } from '../courier.model';

export type CouriersOutput = {
  payload: (typeof Courier.schema.obj)[];
};
