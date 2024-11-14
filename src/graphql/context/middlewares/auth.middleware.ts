import { AuthenticationError } from 'apollo-server-core';
import { AUTH_TYPE } from '../../../constants/auth';
import { decodeToken, isTokenExpired } from '../../../utils/jwt';
import { Context, ContextUser } from '../../../types/context';
import { User } from '../../../modules/user/user.model';
import { PUBLIC_RESOLVERS } from '../../../constants/publicResolvers';
import { BadUserInputError } from 'src/common';
import { RoleEnum } from 'src/enums/role.enum';
import { PERMISSIONS } from 'src/constants/permissions';
import e from 'express';
import { Courier } from 'src/modules/courier/courier.model';
import { Types } from 'mongoose';
import { UserRoleEnum } from 'src/enums/userRole.enum';

export const authMiddleware = async (
  req: e.Request,
  executeResolvers: string[],
): Promise<Context> => {
  const [tokenType, token] = req.headers.authorization?.split(' ') || [];

  const decodedToken = decodeToken<ContextUser>(token);

  let isTokenValid = true;

  if (!decodedToken?._id || !decodedToken?.role) {
    isTokenValid = false;
  }

  let foundUser: { _id: Types.ObjectId };

  if (isTokenValid) {
    const queryFilter = { _id: decodedToken._id };

    foundUser = await (UserRoleEnum[decodedToken.role]
      ? User.exists(queryFilter)
      : Courier.exists(queryFilter));
  }

  const isAccessibleRequest = executeResolvers.every((resolver) => {
    if (PUBLIC_RESOLVERS.has(resolver)) {
      return true;
    } else if (!foundUser) {
      throw new AuthenticationError('User is not found');
    }

    if (tokenType !== AUTH_TYPE || !token) {
      throw new BadUserInputError('Token is not provided');
    }

    if (isTokenExpired(decodedToken)) {
      throw new AuthenticationError('Token expired');
    }

    return PERMISSIONS[decodedToken.role]?.has(resolver);
  });

  if (!isAccessibleRequest) {
    throw new AuthenticationError('You have not permission for this operation');
  }

  return {
    user: {
      _id: foundUser?._id,
      role: decodedToken.role,
    },
  };
};
