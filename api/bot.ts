import { actions } from '../src/actions';
import { APP } from '../src/constants/app';
import { ENV, MODE } from '../src/constants/env';
import { MyContext } from '../src/types/my-context';

import { Bot, GrammyError, HttpError, session, webhookCallback } from 'grammy';

if (!ENV.BOT_TOKEN) throw new Error('BOT_TOKEN is missing!');
if (!MODE) throw new Error('MODE is missing!');

export const bot = new Bot<MyContext>(ENV.BOT_TOKEN);

bot.use(
   session({
      initial: () => ({ postsToPublic: {} }),
   }),
);

export const onMessagePostMenu = actions.menu.onMessagePostMenu();
actions.command.start();
actions.command.post();
actions.command.postInterval();
actions.command.collectPostInterval();
actions.command.collectPost();
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

console.log(`BOT ${APP.name} STARTED IN "${MODE}" MODE`);
