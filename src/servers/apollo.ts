import { ApolloServer } from 'apollo-server-express';
import { schema } from 'src/graphql';
import { createServer } from 'http';
import { expressServer } from './express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .start()
  .then(() => server.applyMiddleware({ app: expressServer, path: '/api' }));

export const apolloServer = createServer(expressServer);
