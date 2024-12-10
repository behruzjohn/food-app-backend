import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { apolloServer } from './configs/servers/apollo';
import { startWsServer } from './configs/servers/ws';
import { bot } from './bot';
import { logger } from './services/logger';

dotenv.config();

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', err.message);
  logger.error('Error stack', err.stack);
});

process.on('unhandledRejection', (reason: string) => {
  logger.error('Unhandled Rejection', reason);
});

async function bootstrap() {
  try {
    const PORT = +process.env.PORT || 8000;
    const HOST = process.env.HOST || `localhost:${PORT}`;

    await mongoose.connect(<string>process.env.DATABASE_URL);

    const startedServer = apolloServer.listen(PORT, () => {
      logger.success('Apollo', `Server started on http://${HOST}`);
    });

    startedServer.on('error', (error) => {
      logger.error('Apollo', error.message);
    });

    startWsServer();

    bot.catch((error) => {
      logger.error('Bot', error.toString());
    });

    await bot.launch(() => {
      logger.success('Telegraf', `Bot started successfully`);
    });
  } catch (error) {
    logger.error('Execution', error);
  }
}

bootstrap();
