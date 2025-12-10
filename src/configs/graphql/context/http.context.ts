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

  const context = { ...authContext };

  if (!next) {
    console.log(1);

    return context;
  }

  req = <any>{ ...req, ...context };

  next();
}
