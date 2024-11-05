import { User } from '../user.model';

export type UsersOutput = {
  payload: (typeof User.schema.obj)[];
};
