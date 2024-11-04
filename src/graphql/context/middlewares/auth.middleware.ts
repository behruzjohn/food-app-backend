import { ApolloError, ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { AUTH_TYPE } from "../../../constants/auth";
import { decodeToken, isTokenExpired } from "../../../utils/jwt";
import { Context, ContextUser } from "../../../types/context";
import { User } from "../../../modules/user/user.model";
import { PUBLIC_RESOLVERS } from "../../../constants/publicResolvers";
import { BadUserInputError } from "src/common";

export const authMiddleware: ContextFunction<ExpressContext> = async ({
  req,
}): Promise<Context | {}> => {
  const [tokenType, token] = req.headers.authorization?.split(" ") || [];

  if (tokenType !== AUTH_TYPE || !token) {
    throw new BadUserInputError("Token is not provided");
  }

  const isPublicRequest = PUBLIC_RESOLVERS.includes(req.body.operationName);

  const decodedToken = decodeToken<ContextUser>(token);

  if (!isPublicRequest) {
    if (isTokenExpired(decodeToken)) {
      throw new ApolloError("Token expired");
    }

    if (!decodedToken?.id || !decodedToken?.telegramId) {
      throw new ApolloError("Token is not valid");
    }

    const foundUser = await User.findById(decodedToken.id);

    if (!foundUser) {
      throw new ApolloError("Forbidden request");
    }

    return { user: { id: foundUser._id, telegramId: foundUser.telegramId } };
  }

  return {};
};
