import { Types } from 'mongoose';
import { User } from 'src/modules/user/user.model';

export type Context = {
  user: typeof User.schema.obj & { _id: Types.ObjectId };
};
