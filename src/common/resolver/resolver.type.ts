import { Context } from 'src/types/context';

export type Resolver<TArgs, TResult> = (
  operation: string,
  args: TArgs,
  context: Context,
) => TResult;

export type Subscription = {
  subscribe: Resolver<unknown, unknown>;
};
