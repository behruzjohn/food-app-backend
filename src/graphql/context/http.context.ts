import { extractExecuteResolvers } from 'src/common';
import { INTROSPECTION_QUERY } from 'src/constants/commonResolvers';
import { authMiddleware } from './middlewares/auth.middleware';
import e from 'express';

export async function httpContext({ req }: { req: e.Request }) {
  if (!req || !req.body) {
    return {};
  }

  const isPollingRequest = req.body['query']
    ?.trim()
    .startsWith(INTROSPECTION_QUERY);

  if (isPollingRequest) return {};

  const executeResolvers = extractExecuteResolvers(req.body['query']);

  const authContext = await authMiddleware(req, executeResolvers);

  return { ...authContext };
}
