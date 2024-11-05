import { Types } from 'mongoose';
import { RoleEnum } from 'src/enums/role.enum';

export type JWTAuthPayload = {
  _id: Types.ObjectId;
  telegramId: number;
  role: RoleEnum;
};
