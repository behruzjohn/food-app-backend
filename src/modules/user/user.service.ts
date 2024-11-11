import { ApolloError } from 'apollo-server-core';
import { BadRequestError, BadUserInputError } from 'src/common';
import { UserRoleEnum } from 'src/enums/role.enum';
import { Context } from 'src/types/context';
import { CourierOutput } from './outputs/courier.output';
import { UserOutput } from './outputs/user.output';
import { UsersOutput } from './outputs/users.output';
import { GetUserByIdProps } from './props/getUserById.props';
import { GetUsersByPhoneProps } from './props/getUsersByPhone.props';
import { GetUsersByRoleProps } from './props/getUsersByRole.props';
import { User } from './user.model';

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

export const getUsersByPhone = async ({
  phone,
}: GetUsersByPhoneProps): Promise<UsersOutput> => {
  const phoneRegex = new RegExp(`^${phone}`, 'i');

  const foundUsers = await User.find({ phone: { $regex: phoneRegex } });

  if (!foundUsers || foundUsers.length === 0) {
    throw new BadRequestError('User not found!');
  }

  return { payload: foundUsers };
};

export const createCourier = async ({
  phone,
}: GetUsersByPhoneProps): Promise<CourierOutput> => {
  const foundUser = await User.findOneAndUpdate(
    {
      phone: phone,
    },
    { $set: { role: UserRoleEnum.courier } },
    { new: true },
  );

  if (!foundUser) {
    throw new BadRequestError('User not found!');
  }

  return { payload: foundUser };
};

export const deleteCourierById = async ({
  userId,
}: GetUserByIdProps): Promise<CourierOutput> => {
  const foundCourier = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { role: UserRoleEnum.user } },
    { new: true },
  );

  if (!foundCourier) {
    throw new BadUserInputError('User not found!');
  }

  return { payload: foundCourier };
};
