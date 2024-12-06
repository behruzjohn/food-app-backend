import { MUTATIONS } from 'src/constants/mutations';
import { QUERIES } from 'src/constants/queries';
import { ROUTES } from 'src/constants/routes';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import { RequestPermission } from 'src/types/permissions';
import { extractExecuteResolvers } from '../resolver';
import { Request } from 'express';
import { INTROSPECTION_QUERY } from 'src/constants/commonResolvers';

type MutationKeys = keyof typeof MUTATIONS;

type QueryKeys = keyof typeof QUERIES;

type SubscriptionKeys = keyof typeof SUBSCRIPTIONS;

type ResolversKeys =
  | MutationKeys
  | QueryKeys
  | SubscriptionKeys
  | 'INTROSPECTION';

export type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export function graphqlExecutionOperationsExtractor(req: Request) {
  if (!req || !req.body) {
    return [];
  }

  const isPollingRequest = req.body['query']
    ?.trim()
    ?.startsWith(INTROSPECTION_QUERY);

  if (isPollingRequest) return [];

  const body = req.body.operations
    ? JSON.parse(req.body['operations'])
    : req.body;

  return extractExecuteResolvers(body.query);
}

export function resolvers(...keys: ResolversKeys[]): RequestPermission {
  const validatedResolvers = [...keys].map(
    (key) => MUTATIONS[key] || QUERIES[key] || SUBSCRIPTIONS[key],
  );

  const resolvers: Set<ResolversKeys> = new Set<ResolversKeys>(
    validatedResolvers,
  );

  return {
    graphql: {
      permissions: resolvers,
    },
  };
}

export function httpExecutionOperationsExtractor(req: Request) {
  const operation = `${req.method}-${req.route.path}`;

  return [operation];
}

export function endpoints(
  ...keys: [Method, keyof typeof ROUTES][]
): RequestPermission {
  const validatedEndpoints = [...keys].map(
    ([method, key]) => `${method}-${ROUTES[key]}`,
  );

  const endpoints = new Set(validatedEndpoints);

  return {
    http: {
      permissions: endpoints,
      uponAccess: (_, __, next) => next && next(),
    },
  };
}
