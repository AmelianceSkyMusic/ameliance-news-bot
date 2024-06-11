import { actions } from '../src/actions';

import 'dotenv/config';
import { Bot, GrammyError, HttpError, webhookCallback } from 'grammy';

const { BOT_TOKEN, MODE } = process.env;

if (!BOT_TOKEN) throw new Error('BOT_TOKEN is missing!');
if (!MODE) throw new Error('MODE is missing!');
export const bot = new Bot(BOT_TOKEN);

actions.command.start();
actions.command.post();
actions.command.postInterval();
actions.hears.post();
actions.on.message();

bot.catch((err) => {
   const ctx = err.ctx;
   console.error(`Помилка під час обробки оновлення ${ctx.update.update_id}:`);
   const e = err.error;
   if (e instanceof GrammyError) {
      console.error('Помилка в запиті:', e.description);
   } else if (e instanceof HttpError) {
      console.error("Не вдалося зв'язатися з Telegram:", e);
   } else {
      console.error('Невідома помилка:', e);
   }
});

if (MODE === 'dev') bot.start();

export default webhookCallback(bot, 'http');

console.log(`BOT STARTED IN "${MODE || 'production'}" MODE`);
