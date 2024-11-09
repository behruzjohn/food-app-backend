import { User } from '../user.model';

export type CourierOutput = {
  payload: typeof User.schema.obj;
};
