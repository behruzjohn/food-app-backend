import { User } from '../user.model';

export type UserOutput = {
  payload: typeof User.schema.obj;
};
