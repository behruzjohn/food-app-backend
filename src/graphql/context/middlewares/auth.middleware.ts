import { AuthenticationError, UserInputError } from 'apollo-server-core';
import { AUTH_TYPE } from '../../../constants/auth';
import { decodeToken, isTokenExpired } from '../../../utils/jwt';
import { Context } from '../../../types/context';
import { User } from '../../../modules/user/user.model';
import { PUBLIC_RESOLVERS } from '../../../constants/publicResolvers';
import { BadUserInputError } from 'src/common';
import { RESOLVERS_PERMISSIONS } from 'src/constants/resolversPermissions';
import e from 'express';
import { ENDPOINTS_PERMISSIONS } from 'src/constants/endpointsPermissions';
import { JWTAuthPayload } from 'src/types/auth';
import { RoleEnum } from 'src/enums/role.enum';

export const authMiddleware = async (
  req: e.Request,
  executeResolvers: string[],
  lang: 'http' | 'graphql' = 'http',
): Promise<Context> => {
  const [tokenType, token] = req.headers.authorization?.split(' ') || [];

  const decodedToken = decodeToken<JWTAuthPayload>(token);

  let isTokenValid = true;

  if (!decodedToken?._id) {
    isTokenValid = false;
  }

  let foundUser: Context['user'];

  if (isTokenValid) {
    const queryFilter = { _id: decodedToken._id };

    foundUser = await User.findOne(queryFilter);
  }
  console.log(executeResolvers);

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
