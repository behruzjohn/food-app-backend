import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { ROUTES } from 'src/constants/routes';
import { schema } from 'src/configs/graphql';
import { httpContext } from 'src/configs/graphql/context/http.context';
import { httpServer } from './http';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  schema,
  context: ({ req }) => httpContext('graphql', req),
});

server
  .start()
  .then(() => server.applyMiddleware({ app: httpServer, path: ROUTES.API }));

export const apolloServer = createServer(httpServer);
