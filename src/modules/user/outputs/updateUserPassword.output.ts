import { User } from '../user.model';

export type UpdateUserPasswordOutput = {
  payload: typeof User.schema.obj;
};
