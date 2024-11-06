import { ApolloError } from 'apollo-server-core';
import { UserOutput } from './outputs/user.output';
import { UsersOutput } from './outputs/users.output';
import { GetUserByIdProps } from './props/getUserById.props';
import { User } from './user.model';

export const getAllUsers = async (): Promise<UsersOutput> => {
  const foundUsers = await User.find();

  return { payload: foundUsers };
};

export const getUserById = async ({
  userId,
}: GetUserByIdProps): Promise<UserOutput> => {
  const foundUser = await User.findById(userId);

  if (!foundUser) {
    throw new ApolloError('User not found!');
  }

  return { payload: foundUser };
};
