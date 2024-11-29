import { authMiddleware } from './middlewares/auth.middleware';
import { NextFunction, Request, Response } from 'express';
import { PERMISSIONS } from 'src/constants/permissions';

export async function httpContext(
  lang: 'http' | 'graphql' = 'graphql',
  req: Request,
  res?: Response,
  next?: NextFunction,
) {
  const authContext = await authMiddleware(PERMISSIONS, lang, req, res, next);

  return { ...authContext };
}
