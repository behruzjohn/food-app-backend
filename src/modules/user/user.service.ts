import { ApolloError } from 'apollo-server-core';
import { User } from './user.model';

export const createUser = async ({ user }) => {
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

export const getUserById = async ({ user }) => {
  try {
    const foundUser = await User.findById(user.id);
    if (!foundUser) {
      throw new ApolloError('User not found!');
    }
    return { payload: foundUser };
  } catch (error) {
    throw new ApolloError('Error during getting user!');
  }
};

export const updateUserById = async ({ user }) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(user);
    if (!updatedUser) {
      throw new ApolloError('User not found!');
    }
    return { payload: updatedUser };
  } catch (error) {
    throw new ApolloError('Error during updating user!');
  }
};
export const deleteUserById = async ({ user }) => {
  try {
    const deletedUser = await User.findByIdAndDelete(user.id);
    if (!deletedUser) {
      throw new ApolloError('User not found!');
    }
  } catch (error) {
    throw new ApolloError('Error during deleting the user!');
  }
};
