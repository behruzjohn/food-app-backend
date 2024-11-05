import { typeDefs } from './types';
import { resolvers } from './resolvers';
import { context } from './context';
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const server = new ApolloServer({
  schema,
  context,
  introspection: true,
});
