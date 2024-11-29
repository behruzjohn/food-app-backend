import { NextFunction, Request, Response } from 'express';
import { httpContext } from '../http.context';
import { HttpStatusCode } from 'axios';

export const httpServerAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) =>
  httpContext('http', req, res, next).catch((error) =>
    res.status(error.code || HttpStatusCode.InternalServerError).json(error),
  );
