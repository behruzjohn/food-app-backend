import { Request } from 'express';
import { extractExecuteResolvers } from 'src/common';
import { authMiddleware } from './middlewares/auth.middleware';
import { PERMISSIONS } from 'src/constants/permissions';

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
      PERMISSIONS,
      'graphql',
      mockRequest,
    ).catch((err) => {
      throw err;
    });

    return { ...authContext };
  }
}
