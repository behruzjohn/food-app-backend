import { ApolloError } from 'apollo-server-core';
import { BadRequestError } from 'src/common';
import { Context } from 'src/types/context';
import { compareBcryptHash } from 'src/utils/bcrypt';
import { UpdateUserPasswordOutput } from './outputs/updateUserPassword.output';
import { UserOutput } from './outputs/user.output';
import { UsersOutput } from './outputs/users.output';
import { UpdateUserDataByIdProps } from './props/changeUserValues.props';
import { GetUserByIdProps } from './props/getUserById.props';
import { GetUsersProps } from './props/getUsers.props';
import { UpdateUserPasswordProps } from './props/updateUserPassword.props';
import { User } from './user.model';

export const getUsers = async ({
  filter: { phone } = {},
}: GetUsersProps): Promise<UsersOutput> => {
  let filter: Record<string, any> = {};

  if (phone) {
    const phoneRegex = new RegExp(`^${phone}`, 'i');

    filter = { ...filter, phone: { $regex: phoneRegex } };
  }

  const foundUsers = await User.find(filter);

  if (!foundUsers || foundUsers.length === 0) {
    throw new BadRequestError('User not found!');
  }

  return { payload: foundUsers };
};

export const getUserById = async (
  { userId }: GetUserByIdProps,
  { user }: Context,
): Promise<UserOutput> => {
  if (userId) {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      throw new ApolloError('User not found!');
    }

    return { payload: foundUser };
  }

  return { payload: user };
};

export const updateUserById = async ({
  userId,
  data,
}: UpdateUserDataByIdProps): Promise<UserOutput> => {
  const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

  if (!updatedUser) {
    throw new BadRequestError('Error during changing properties!');
  }

  return { payload: updatedUser };
};

export const changeUserPasswordById = async ({
  data,
}: UpdateUserPasswordProps): Promise<UpdateUserPasswordOutput> => {
  console.log('userId', data.userId);

  const foundUser = await User.findById(data.userId);

  const isPasswordCorrect = compareBcryptHash(
    foundUser.password.toString(),
    data.oldPassword,
  );

  if (!isPasswordCorrect) {
    throw new BadRequestError('Your old password is not correct!');
  }

  foundUser.password = data.newPassword;

  await foundUser.save();

  return { payload: foundUser };
};
