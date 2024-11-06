import { Resolver, Subscription } from './resolver.type';
import { QUERIES } from 'src/constants/queries';
import { MUTATIONS } from 'src/constants/mutations';
import { SUBSCRIPTIONS } from 'src/constants/subscriptions';
import { FieldNode, OperationDefinitionNode, parse } from 'graphql';
import { OPERATION_DEFINITION } from 'src/constants/definitions';

export function queries(
  resolvers: Record<keyof typeof QUERIES, Resolver<unknown, unknown>>,
) {
  const renamedResolvers = {};

  Object.keys(resolvers).forEach((resolver) => {
    renamedResolvers[QUERIES[resolver]] = resolvers[resolver];
  });

  return renamedResolvers;
}

export function mutations(
  resolvers: Record<keyof typeof MUTATIONS, Resolver<unknown, unknown>>,
) {
  const renamedResolvers = {};

  Object.keys(resolvers).forEach((resolver) => {
    renamedResolvers[MUTATIONS[resolver]] = resolvers[resolver];
  });

  return renamedResolvers;
}

export function subscriptions(
  resolvers: Record<keyof typeof SUBSCRIPTIONS, Subscription>,
) {
  const renamedResolvers = {};

  Object.keys(resolvers).forEach((resolver) => {
    renamedResolvers[SUBSCRIPTIONS[resolver]] = resolvers[resolver];
  });

  return renamedResolvers;
}

export const extractExecuteResolvers = (query: string): string[] => {
  const ast = parse(query || '');

  const operationDefinition = <OperationDefinitionNode>(
    ast.definitions.find(({ kind }) => kind === OPERATION_DEFINITION)
  );

  if (!operationDefinition) return [];

  const executeResolvers = (<FieldNode[]>(
    operationDefinition.selectionSet.selections
  )).map(({ name }) => name.value);

  return executeResolvers;
};
