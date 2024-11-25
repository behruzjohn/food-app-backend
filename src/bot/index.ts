import { Scenes, session, Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { SCENES } from 'src/constants/scenes';
import { adminScenes } from './admin/scenes';

dotenv.config();

export const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const stage = new Scenes.Stage<any>([...adminScenes]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  (<any>ctx).scene.enter(SCENES.MAIN);
});
