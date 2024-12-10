import { Types } from 'mongoose';

export type UserSchema = {
  photo: string;
  name: string;
  role: string;
  telegramId: string;
  phone: string;
  favoriteFoods: (typeof Types.ObjectId)[];
  password: string;
};
