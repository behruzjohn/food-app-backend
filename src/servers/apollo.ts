import { ApolloServer } from 'apollo-server-express';
import { schema } from 'src/graphql';
import { createServer } from 'http';
import { expressServer } from './express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.start().then(() => server.applyMiddleware({ app, path: '/api' }));

export const apolloServer = createServer(app);
