import { ApolloError } from 'apollo-server-core';
import { BadRequestError } from 'src/common';
import { Context } from 'src/types/context';
import { UserOutput } from './outputs/user.output';
import { UsersOutput } from './outputs/users.output';
import { GetUserByIdProps } from './props/getUserById.props';
import { User } from './user.model';
import { GetUsersProps } from './props/getUsers.props';

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
