import { resolvers } from './resolvers';
import { typeDefs } from './types';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const schema = makeExecutableSchema({ typeDefs, resolvers });
