import { WebSocketServer } from 'ws';
import { apolloServer } from './apollo';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from 'src/graphql';
import { subscriptionContext } from 'src/graphql/context/ws.context';
import { ROUTES } from 'src/constants/routes';

export function startWsServer() {
  const wsServer = new WebSocketServer({
    server: apolloServer,
    path: ROUTES.API,
  });

  useServer(
    {
      schema,
      context: (ctx, msg) => {
        const connectionParams = ctx.connectionParams;
        const payload = msg.payload;
        return subscriptionContext({ connectionParams, payload });
      },
    },
    wsServer,
  );
}
