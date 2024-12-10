import { Types } from 'mongoose';
import { UserSchema } from 'src/modules/user/types/userSchema.type';

export type Context = {
  user: UserSchema & { _id: typeof Types.ObjectId } & {
    save: () => Promise<void>;
  };
};
