import { ApolloError } from 'apollo-server-core';
import { UserOutput } from './outputs/user.output';
import { UsersOutput } from './outputs/users.output';
import { GetUserByIdProps } from './props/getUserById.props';
import { UpdateUserByIdProps } from './props/updateUser.props';
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

export const updateUserById = async ({
  user,
  id,
}: UpdateUserByIdProps): Promise<UserOutput> => {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

  if (!updatedUser) {
    throw new ApolloError('User not found!');
  }

  return { payload: updatedUser };
};
