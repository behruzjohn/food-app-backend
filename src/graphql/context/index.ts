import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { authMiddleware } from "./middlewares/auth.middleware";
import { INTROSPECTION_QUERY } from "../../constants/commonResolvers";
import { FieldNode, OperationDefinitionNode, parse } from "graphql";
import { OPERATION_DEFINITION } from "src/constants/definitions";
import { Request } from "express";

export const extractExecuteResolvers = (req: Request): string[] => {
  const ast = parse(req.body["query"] || "");

  const operationDefinition = <OperationDefinitionNode>(
    ast?.definitions.find(({ kind }) => kind === OPERATION_DEFINITION)
  );

  const executeResolvers = (<FieldNode[]>(
    operationDefinition.selectionSet.selections
  )).map(({ name }) => name.value);

  return executeResolvers;
};

export const context: ContextFunction<ExpressContext> = async (
  requestParams
) => {
  const isPollingRequest = requestParams.req.body.query
    .trim()
    .startsWith(INTROSPECTION_QUERY);

  if (isPollingRequest) return;

  const executeResolvers = extractExecuteResolvers(requestParams.req);

  const authContext = await authMiddleware(requestParams, executeResolvers);

  return { ...authContext };
};
