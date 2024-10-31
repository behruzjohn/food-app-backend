import { ApolloError } from 'apollo-server-core';
import { User } from './user.model';
import { UserOutput } from './outputs/user.output';
import { CreateUserProps } from './props/createUser.props';
import { GetUserByIdProps } from './props/getUserById.props';
import { UpdateUserByIdProps } from './props/updateUser.props';

export const createUser = async ({
  user,
}: CreateUserProps): Promise<UserOutput> => {
  try {
    const createdUser = await User.create(user);
    if (!createdUser) {
      throw new ApolloError('Error during creating user!');
    }
    return { payload: createdUser };
  } catch (error) {
    throw new ApolloError('User not created!');
  }
};

export const getAllUsers = async () => {
  const foundUsers = await User.find();
  return { payload: foundUsers };
};

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
