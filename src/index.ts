import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { apolloServer } from './servers/apollo';
import { startWsServer } from './servers/ws';
import { bot } from './bot';

dotenv.config();

async function bootstrap() {
  try {
    const PORT = +process.env.PORT || 8000;

    await mongoose.connect(<string>process.env.DATABASE_URL);

    apolloServer.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });

    startWsServer();

    await bot
      .launch(() => {
        console.log(`Bot started`);
      })
      .catch(console.log);
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
