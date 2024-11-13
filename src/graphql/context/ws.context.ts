import { Request } from 'express';
import { extractExecuteResolvers } from 'src/common';
import { authMiddleware } from './middlewares/auth.middleware';

export async function subscriptionContext({
  connectionParams,
  payload,
}: {
  connectionParams: any;
  payload: any;
}) {
  const authToken =
    connectionParams?.Authorization || connectionParams?.authorization;

  const mockRequest = {
    headers: { authorization: authToken || '' },
  } as Request;

  const authContext = await authMiddleware(mockRequest, []);

  if (payload && payload.query) {
    const { query, operationName } = payload;

    const executeResolvers = extractExecuteResolvers(query);

    return { ...authContext, executeResolvers, operationName };
  }

  return { ...authContext };
}
