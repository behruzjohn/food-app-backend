import { MUTATIONS } from 'src/constants/mutations';
import { QUERIES } from 'src/constants/queries';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';

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
