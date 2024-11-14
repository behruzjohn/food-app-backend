import { ApolloServer } from 'apollo-server-express';
import { schema } from 'src/graphql';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { httpServer } from './httpServer';
import { ROUTES } from 'src/constants/routes';
import { httpContext } from 'src/graphql/context/http.context';

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
