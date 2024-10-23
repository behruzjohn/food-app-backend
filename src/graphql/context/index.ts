import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { authMiddleware } from "./middlewares/auth.middleware";

export const context: ContextFunction<ExpressContext> = async (
  requestParams
) => {
  await authMiddleware(requestParams);
};
