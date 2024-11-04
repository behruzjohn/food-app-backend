import { ApolloError } from 'apollo-server-core';
import { UserOutput } from './outputs/user.output';
import { GetUserByIdProps } from './props/getUserById.props';
import { UpdateUserByIdProps } from './props/updateUser.props';
import { User } from './user.model';

export const getUserById = async ({
  userId,
}: GetUserByIdProps): Promise<UserOutput> => {
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      throw new ApolloError('User not found!');
    }
    return { payload: foundUser };
  } catch (error) {
    throw new ApolloError('Error during getting user!');
  }
};

export const updateUserById = async ({
  user,
  id,
}: UpdateUserByIdProps): Promise<UserOutput> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    if (!updatedUser) {
      throw new ApolloError('User not found!');
    }
    return { payload: updatedUser };
  } catch (error) {
    throw new ApolloError('Error during updating user!');
  }
};
