import { MUTATIONS } from 'src/constants/mutations';
import { QUERIES } from 'src/constants/queries';
import { ROUTES } from 'src/constants/routes';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import { Method } from 'src/types/endpointsPermissions';

type MutationKeys = keyof typeof MUTATIONS;

type QueryKeys = keyof typeof QUERIES;

type SubscriptionKeys = keyof typeof SUBSCRIPTIONS;

type ResolversKeys = MutationKeys | QueryKeys | SubscriptionKeys;

export function resolvers(...keys: ResolversKeys[]): Set<string> {
  const validatedResolvers = [...keys].map(
    (key) => MUTATIONS[key] || QUERIES[key] || SUBSCRIPTIONS[key],
  );

  const resolvers: Set<ResolversKeys> = new Set<ResolversKeys>(
    validatedResolvers,
  );

  return resolvers;
}

export function endpoints(...keys: [Method, keyof typeof ROUTES][]) {
  const validatedResolvers = [...keys].map(
    ([method, key]) => `${method}-${ROUTES[key]}`,
  );

  const endpoints = new Set(validatedResolvers);

  return endpoints;
}
