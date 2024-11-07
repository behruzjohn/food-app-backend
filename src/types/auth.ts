import { Types } from 'mongoose';
import { UserRoleEnum } from 'src/enums/role.enum';

export type JWTAuthPayload = {
  _id: Types.ObjectId;
  telegramId: number;
  role: UserRoleEnum;
};
