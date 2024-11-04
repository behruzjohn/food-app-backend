import { AuthenticationError } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { AUTH_TYPE } from "../../../constants/auth";
import { decodeToken, isTokenExpired } from "../../../utils/jwt";
import { Context, ContextUser } from "../../../types/context";
import { User } from "../../../modules/user/user.model";
import { PUBLIC_RESOLVERS } from "../../../constants/publicResolvers";
import { BadUserInputError } from "src/common";
import { ADMIN_RESOLVERS } from "src/constants/adminResolvers";
import { RoleEnum } from "src/enums/role.enum";

export const authMiddleware = async (
  { req }: ExpressContext,
  executeResolvers: string[]
): Promise<Context> => {
  const [tokenType, token] = req.headers.authorization?.split(" ") || [];

  if (tokenType !== AUTH_TYPE || !token) {
    throw new BadUserInputError("Token is not provided");
  }

  const isPublicRequest = PUBLIC_RESOLVERS.includes(req.body.operationName);

  const decodedToken = decodeToken<ContextUser>(token);

  if (!isPublicRequest) {
    if (isTokenExpired(decodeToken)) {
      throw new AuthenticationError("Token expired");
    }

    if (!decodedToken?.id || !decodedToken?.telegramId) {
      throw new AuthenticationError("Invalid token");
    }

    const foundUser = await User.findById(decodedToken.id);

    if (!foundUser) {
      throw new AuthenticationError("Forbidden request");
    }

    const isAdminResolver = ADMIN_RESOLVERS.includes(req.body?.operationName);

    const isAdmin = foundUser.role === RoleEnum.admin;

    if (isAdminResolver && !isAdmin)
      throw new AuthenticationError("Forbidden request");

    return {
      user: {
        id: foundUser._id,
        telegramId: foundUser.telegramId,
        role: RoleEnum[foundUser.role],
      },
    };
  }
};
