import { ApolloError } from 'apollo-server-core';
import { BadRequestError } from 'src/common';
import { Context } from 'src/types/context';
import { compareBcryptHash } from 'src/utils/bcrypt';
import { UserOutput } from './outputs/user.output';
import { UsersOutput } from './outputs/users.output';
import { GetUserByIdProps } from './props/getUserById.props';
import { GetUsersProps } from './props/getUsers.props';
import { UpdateUserProps } from './props/updateUser.props';
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

export const updateUserById = async (
  { data: { name } }: UpdateUserProps,
  { user }: Context,
): Promise<UserOutput> => {
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { name },
    {
      new: true,
    },
  );

  if (!updatedUser) {
    throw new BadRequestError('Error during changing properties!');
  }

  return { payload: updatedUser };
};

export const changeUserPasswordById = async (
  { data }: UpdateUserPasswordProps,
  { user }: Context,
): Promise<UserOutput> => {
  const isPasswordCorrect = await compareBcryptHash(
    user.password.toString(),
    data.oldPassword,
  );

  if (!isPasswordCorrect) {
    throw new BadRequestError('Your old password is not correct!');
  }

  user.password = data.newPassword;

  await user['save']();

  return { payload: user };
};
