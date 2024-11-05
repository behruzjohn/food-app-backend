import { authMiddleware } from './middlewares/auth.middleware';
import { INTROSPECTION_QUERY } from '../../constants/commonResolvers';
import { FieldNode, OperationDefinitionNode, parse } from 'graphql';
import { OPERATION_DEFINITION } from 'src/constants/definitions';
import { Request } from 'express';

export const extractExecuteResolvers = (query: string): string[] => {
  const ast = parse(query || '');

  const operationDefinition = <OperationDefinitionNode>(
    ast?.definitions.find(({ kind }) => kind === OPERATION_DEFINITION)
  );

  if (!operationDefinition) return [];

  const executeResolvers = (<FieldNode[]>(
    operationDefinition.selectionSet.selections
  )).map(({ name }) => name.value);

  return executeResolvers;
};

export const context = async ({ req, connection }) => {
  if (connection) {
    const authToken = connection.params?.authorization;

    const mockRequest = {
      headers: { authorization: authToken || '' },
    } as Request;

    const authContext = await authMiddleware(mockRequest, []);

    return { ...authContext };
  }

  if (!req || !req.body) {
    return {};
  }

  const isPollingRequest = req?.body?.query
    ?.trim()
    .startsWith(INTROSPECTION_QUERY);

  if (isPollingRequest) return {};

  const executeResolvers = extractExecuteResolvers(req?.body?.query);

  const authContext = await authMiddleware(req, executeResolvers);

  return { ...authContext };
};
