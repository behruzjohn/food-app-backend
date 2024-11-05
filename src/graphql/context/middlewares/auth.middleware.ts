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

export const authMiddleware = async (
  req: e.Request,
  executeResolvers: string[],
): Promise<Context> => {
  const [tokenType, token] = req.headers.authorization?.split(' ') || [];

  const decodedToken = decodeToken<ContextUser>(token);

  let isTokenValid = true;

  if (!decodedToken?.id || !decodedToken?.telegramId) {
    isTokenValid = false;
  }

  const foundUser = isTokenValid ? await User.findById(decodedToken.id) : null;

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

    return PERMISSIONS[<RoleEnum>foundUser.role].has(resolver);
  });

  if (!isAccessibleRequest) {
    throw new AuthenticationError('You have not permission for this operation');
  }

  return {
    user: {
      id: foundUser?._id,
      telegramId: foundUser?.telegramId,
      role: <RoleEnum>foundUser?.role,
    },
  };
};
