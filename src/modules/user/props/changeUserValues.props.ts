import { Types } from 'mongoose';
import { UpdateUserDataByIdPropsInput } from '../inputs/updateUserData.input';

export type UpdateUserDataByIdProps = {
  userId: Types.ObjectId;
  data: UpdateUserDataByIdPropsInput;
};
