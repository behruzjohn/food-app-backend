import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { ROUTES } from 'src/constants/routes';
import { schema } from 'src/graphql';
import { httpContext } from 'src/graphql/context/http.context';
import { httpServer } from './httpServer';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  schema,
  context: httpContext,
});

server
  .start()
  .then(() => server.applyMiddleware({ app: httpServer, path: ROUTES.API }));

export const apolloServer = createServer(httpServer);
