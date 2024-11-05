import { User } from 'src/modules/user/user.model';

export type AuthOutput = {
  user: typeof User.schema.obj;
  token: string;
};
