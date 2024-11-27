import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { apolloServer } from './servers/apollo';
import { startWsServer } from './servers/ws';
import { bot } from './bot';
import { log } from './service/logger.service';

dotenv.config();

process.on('uncaughtException', (err) => {
  log('ERROR', 'Uncaught Exception', err.message);
  log('ERROR', 'Error stack', err.stack);
});

process.on('unhandledRejection', (reason) => {
  log('ERROR', 'Unhandled Rejection', reason.toString());
});

async function bootstrap() {
  try {
    const PORT = +process.env.PORT || 8000;
    const HOST = process.env.HOST || `localhost:${PORT}`;

    await mongoose.connect(<string>process.env.DATABASE_URL);

    const startedServer = apolloServer.listen(PORT, () => {
      log('SUCCESS', 'Apollo', `Server started on http://${HOST}`);
    });

    startedServer.on('error', (error) => {
      log('ERROR', 'Apollo', error.message);
    });

    startWsServer();

    bot.catch((error) => {
      log('ERROR', 'BOT', error.toString());
    });

    await bot.launch(() => {
      log('SUCCESS', 'Telegraf', `Bot started successfully`);
    });
  } catch (error) {
    log('ERROR', 'EXECUTION', error);
  }
}

bootstrap();
