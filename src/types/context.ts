import { Types } from 'mongoose';

export type ContextUser = {
  id: Types.ObjectId;
  telegramId: number;
};

export type Context = {
  user: ContextUser;
};
