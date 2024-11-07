import { Types } from 'mongoose';
import { UserRoleEnum } from 'src/enums/role.enum';

export type ContextUser = {
  _id: Types.ObjectId;
  telegramId: number;
  role: UserRoleEnum;
};

export type Context = {
  user: ContextUser;
};
