import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { authMiddleware } from "./middlewares/auth.middleware";
import { INTROSPECTION_QUERY } from "../../constants/commonResolvers";

export const context: ContextFunction<ExpressContext> = async (
  requestParams
) => {
  const isPollingRequest =
    requestParams.req.body.query.includes(INTROSPECTION_QUERY);

  if (isPollingRequest) return;

  const authContext = await authMiddleware(requestParams);

  return { ...authContext };
};
