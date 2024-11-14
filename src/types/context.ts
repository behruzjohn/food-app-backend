import { Types } from 'mongoose';
import { RoleEnum } from 'src/enums/role.enum';

export type ContextUser = {
  _id: Types.ObjectId;
  role?: RoleEnum;
};

export type Context = {
  user: ContextUser;
};
