import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { apolloServer } from './servers/apollo';
import { startWsServer } from './servers/ws';
import { bot } from './bot';
import { log } from './service/logger.service';

dotenv.config();

async function bootstrap() {
  try {
    const PORT = +process.env.PORT || 8000;

    await mongoose.connect(<string>process.env.DATABASE_URL);

    apolloServer.listen(PORT, () => {
      log('SUCCESS', 'APOLLO', `Server started on port: ${PORT}`);
    });

    startWsServer();

    bot.catch((error) => {
      log('ERROR', 'BOT', error.toString());
    });

    await bot.launch(() => {
      log('SUCCESS', 'TELEGRAF', `Bot started successfully`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
