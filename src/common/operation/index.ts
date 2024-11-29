import { NextFunction, Request, Response } from 'express';
import { REQUEST_LANGUAGES } from 'src/constants/request';
import {
  graphqlExecutionOperationsExtractor,
  httpExecutionOperationsExtractor,
} from '../permission';

export type OperationExtractors = Record<
  keyof typeof REQUEST_LANGUAGES,
  (req: Request, res?: Response, next?: NextFunction) => string[]
>;

export const EXTRACTORS: OperationExtractors = {
  graphql: graphqlExecutionOperationsExtractor,
  http: httpExecutionOperationsExtractor,
};
