import { extractExecuteResolvers } from 'src/common';
import { authMiddleware } from './middlewares/auth.middleware';
import { Request } from 'express';
import { AuthenticationError } from 'apollo-server-core';

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

  if (payload && payload.query) {
    const { query } = payload;

    const executeResolvers = extractExecuteResolvers(query);

    const authContext = await authMiddleware(
      mockRequest,
      executeResolvers,
    ).catch((err) => {
      throw err;
    });

    return { ...authContext };
  }
}
