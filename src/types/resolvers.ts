import { Context } from './context';

export type Resolvers<
  TArgs = Record<string, unknown>,
  TResult = unknown,
> = Record<
  string,
  (operation: string, args: TArgs, context: Context) => TResult
>;
