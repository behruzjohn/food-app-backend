import { Types } from 'mongoose';
import { UserInput } from '../inputs/userCreate.input';

export type UpdateUserByIdProps = {
  user: UserInput;
  id: Types.ObjectId;
};
