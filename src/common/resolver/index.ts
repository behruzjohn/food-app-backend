import {
  DocumentNode,
  FieldNode,
  OperationDefinitionNode,
  parse,
} from 'graphql';
import { OPERATION_DEFINITION } from 'src/constants/definitions';
import { EXCEPTION_SELECTIONS_NODES } from 'src/constants/exceptionSelectionsNodes';
import { Subscription } from './resolver.type';

export function resolversHandlers<T extends Record<string, any>>(keys: T) {
  return <THandler extends Function | Subscription>(
    resolvers: Record<keyof typeof keys, THandler>,
  ) => {
    const renamedResolvers = {};

    Object.keys(resolvers).forEach((resolver) => {
      renamedResolvers[keys[resolver]] =
        typeof resolvers[resolver] === 'function'
          ? (...props: unknown[]) => {
              try {
                return (<Function>resolvers[resolver])(...props);
              } catch (error) {
                console.error(error);
              }
            }
          : {
              ...resolvers[resolver],
              subscribe: () => {
                try {
                  return (<Subscription>resolvers[resolver]).subscribe();
                } catch (error) {
                  console.error(error);
                }
              },
            };
    });

    return renamedResolvers;
  };
}

export const extractExecuteResolvers = (query: string): string[] => {
  let ast: DocumentNode;

  ast = parse(query || '');

  const operationDefinition = <OperationDefinitionNode>(
    ast.definitions.find(({ kind }) => kind === OPERATION_DEFINITION)
  );

  if (!operationDefinition) return [];

  const executeResolvers: string[] = [];

  const { selections } = operationDefinition.selectionSet;

  for (const { name } of <FieldNode[]>selections) {
    if (!EXCEPTION_SELECTIONS_NODES.has(name.value)) {
      executeResolvers.push(name.value);
    }
  }

  return executeResolvers;
};
