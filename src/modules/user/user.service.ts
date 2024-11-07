import { ApolloError } from 'apollo-server-core';
import { BadRequestError } from 'src/common';
import { UserOutput } from './outputs/user.output';
import { UsersOutput } from './outputs/users.output';
import { GetUserByIdProps } from './props/getUserById.props';
import { getUsersByPhoneProps } from './props/getUsersByPhone.props';
import { User } from './user.model';
import { UserRoleEnum } from 'src/enums/role.enum';
import { Context } from 'src/types/context';
import { GetUsersByRoleProps } from './props/getUsersByRole.props';

export const getAllUsers = async (): Promise<UsersOutput> => {
  const foundUsers = await User.find({ role: UserRoleEnum.user });

  return { payload: foundUsers };
};

export const getUserById = async (
  { userId }: GetUserByIdProps,
  { user }: Context,
): Promise<UserOutput> => {
  const foundUser = await User.findById(userId || user._id);

  if (!foundUser) {
    throw new ApolloError('User not found!');
  }

  return { payload: foundUser };
};

export const getUsersByRole = async ({
  role,
}: GetUsersByRoleProps): Promise<UsersOutput> => {
  const foundUsers = await User.find({ role });

  return { payload: foundUsers };
};

export const getUsersByPhone = async ({ phone }: getUsersByPhoneProps) => {
  const phoneRegex = new RegExp(`^${phone}`, 'i');

  const foundUsers = await User.find({ phone: { $regex: phoneRegex } });

  if (!foundUsers || foundUsers.length === 0) {
    throw new BadRequestError('User not found!');
  }

  return foundUsers;
};
