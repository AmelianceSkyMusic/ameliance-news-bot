import { bot } from '../../../api/bot';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { removeMessageById } from '../../shared/helpers/remove-message-by-id';
import { runWithTimeout } from '../../shared/helpers/run-with-timeout';

import { Context } from 'grammy';

export function post() {
   bot.command('post', async (ctx) => {
      console.time('runWithTimeout');
      const initialResponse = await ctx.reply('Обробляю ваш запит...');
      try {
         const result = await runWithTimeout(ctx, async () => {
            const timeout = (ctx: Context) =>
               new Promise<void>((resolve) =>
                  setTimeout(async () => {
                     await ctx.reply('Шось там роблю');
                     resolve();
                  }, 20000),
               );
            await timeout(ctx);
         });
         console.log('result: ', result);
      } catch (error) {
         handleAppError(error);
      } finally {
         if (initialResponse) {
            await removeMessageById({ ctx, messageId: initialResponse.message_id });
         }
      }

      console.timeEnd('runWithTimeout');
   });
}
