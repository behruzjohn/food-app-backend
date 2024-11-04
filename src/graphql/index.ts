import { typeDefs } from './types';
import { resolvers } from './resolvers';
import { context } from './context';
import { ApolloServer } from 'apollo-server';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
});
