import {
  DocumentNode,
  FieldNode,
  OperationDefinitionNode,
  parse,
} from 'graphql';
import { OPERATION_DEFINITION } from 'src/constants/definitions';
import { EXCEPTION_SELECTIONS_NODES } from 'src/constants/exceptionSelectionsNodes';

export function resolversHandlers<T extends Record<string, any>>(keys: T) {
  return <THandler>(resolvers: Record<keyof typeof keys, THandler>) => {
    const renamedResolvers = {};

    Object.keys(resolvers).forEach((resolver) => {
      renamedResolvers[keys[resolver]] = resolvers[resolver];
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
