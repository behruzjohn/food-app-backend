import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { context } from './graphql/context';

dotenv.config();

async function bootstrap() {
  const PORT = +process.env.PORT || 8000;

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    schema,
    context,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/', cors: true });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });

  useServer(
    {
      schema,
      onConnect: async (ctx) => {
        ctx.extra = { headers: ctx.connectionParams.headers } as any;
      },
      context,
    },
    wsServer,
  );

  mongoose
    .connect(<string>process.env.DATABASE_URL)
    .then(() => {
      httpServer.listen(PORT, () =>
        console.log(`Server started on port: ${PORT}`),
      );
    })
    .catch(console.log);
}

bootstrap();
