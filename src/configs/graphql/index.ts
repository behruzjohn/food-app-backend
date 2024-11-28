import { resolvers } from './resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import { typeDefs } from './types';

export const pubsub = new PubSub();

export const schema = makeExecutableSchema({ typeDefs, resolvers });
