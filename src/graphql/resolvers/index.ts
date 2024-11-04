import { scalars } from '../scalars';
import { mutation } from './mutation';
import { subscription } from './subscription';
import { query } from './query';

export const resolvers = {
  Query: query,
  Mutation: mutation,
  Subscription: subscription,

  ...scalars,
};
