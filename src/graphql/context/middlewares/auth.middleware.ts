import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";

export const authMiddleware: ContextFunction<ExpressContext> = async ({
  req,
  res,
}) => {
  // auth middleware logic
};
