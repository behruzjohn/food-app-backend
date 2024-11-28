import { WebSocketServer } from 'ws';
import { apolloServer } from './apollo';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from 'src/configs/graphql';
import { subscriptionContext } from 'src/configs/graphql/context/ws.context';
import { ROUTES } from 'src/constants/routes';

export function startWsServer() {
  const wsServer = new WebSocketServer({
    server: apolloServer,
    path: ROUTES.API,
  });

  useServer(
    {
      schema,
      context: async ({ connectionParams }, { payload }) => {
        return await subscriptionContext({
          connectionParams,
          payload,
        }).catch(() => {});
      },
    },
    wsServer,
  );
}
