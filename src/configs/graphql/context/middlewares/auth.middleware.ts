import { AuthenticationError, UserInputError } from 'apollo-server-core';
import e from 'express';
import { BadUserInputError } from 'src/common';
import { ENDPOINTS_PERMISSIONS } from 'src/constants/endpointsPermissions';
import { RESOLVERS_PERMISSIONS } from 'src/constants/resolversPermissions';
import { RoleEnum } from 'src/enums/role.enum';
import { JWTAuthPayload } from 'src/types/auth';
import { AUTH_TYPE } from '../../../../constants/auth';
import { PUBLIC_RESOLVERS } from '../../../../constants/publicResolvers';
import { User } from '../../../../modules/user/user.model';
import { Context } from '../../../../types/context';
import { decodeToken, isTokenExpired } from '../../../../utils/jwt';

export const authMiddleware = async (
  req: e.Request,
  executeResolvers: string[],
  lang: 'http' | 'graphql' = 'http',
): Promise<Context> => {
  const [tokenType, token] = req.headers.authorization?.split(' ') || [];

  const decodedToken = token && decodeToken<JWTAuthPayload>(token);

  let isTokenValid = true;

  if (!decodedToken?._id) {
    isTokenValid = false;
  }

  let foundUser: Context['user'];

  if (isTokenValid) {
    const queryFilter = { _id: decodedToken._id };

    foundUser = await User.findOne(queryFilter);
  }

  const isAccessibleRequest = executeResolvers.every((resolver) => {
    if (PUBLIC_RESOLVERS.has(resolver)) {
      return true;
    } else if (!foundUser) {
      throw new AuthenticationError('User is not found');
    }

    if (!isTokenValid) {
      throw new UserInputError('Invalid token');
    }

    if (tokenType !== AUTH_TYPE || !token) {
      throw new BadUserInputError('Token is not provided');
    }

    if (isTokenExpired(decodedToken)) {
      throw new AuthenticationError('Token expired');
    }

    if (lang === 'graphql') {
      return RESOLVERS_PERMISSIONS[<RoleEnum>foundUser.role]?.has(resolver);
    } else {
      return ENDPOINTS_PERMISSIONS[<RoleEnum>foundUser.role]?.has(
        `${req.method}-${req.route}`,
      );
    }
  });

  if (!isAccessibleRequest) {
    throw new AuthenticationError('You have not permission for this operation');
  }

  return {
    user: foundUser,
  };
};
