import { AuthenticationError, UserInputError } from 'apollo-server-core';
import { NextFunction, Request, Response } from 'express';
import { BadUserInputError } from 'src/common';
import { JWTAuthPayload } from 'src/types/auth';
import { AUTH_TYPE } from 'src/constants/auth';
import { PUBLIC_OPERATIONS } from 'src/constants/publicOperations';
import { User } from 'src/modules/user/user.model';
import { Context } from 'src/types/context';
import { decodeToken, isTokenExpired } from 'src/utils/jwt';
import { RoleEnum } from 'src/enums/role.enum';
import { EXTRACTORS } from 'src/common/operation';
import { PERMISSIONS } from 'src/constants/permissions';

export const authMiddleware = async (
  permissions: typeof PERMISSIONS,
  lang: 'http' | 'graphql' = 'graphql',
  req: Request,
  res?: Response,
  next?: NextFunction,
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

  const executeOperations = EXTRACTORS[lang](req, res, next);

  const isAccessibleRequest = executeOperations.every((operation) => {
    if (PUBLIC_OPERATIONS[lang]?.permissions.has(operation)) {
      return true;
    }

    if (!foundUser) {
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

    if (permissions[<RoleEnum>foundUser.role]) {
      return permissions[<RoleEnum>foundUser.role][lang].permissions.has(
        operation,
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
