export type Resolvers<
  TArgs = Record<string, unknown>,
  TResult = unknown
> = Record<string, (operation: string, args: TArgs) => TResult>;
