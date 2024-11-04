import { Types } from 'mongoose';
import { UserOutput } from '../outputs/user.output';
import { UserInput } from '../inputs/userCreate.input';

export type CreateUserProps = {
  user: UserInput;
};
