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
         const result = await runWithTimeout(ctx, async (ctx, abortSignal) => {
            const timeout = (ctx: Context, signal: AbortSignal) =>
               new Promise<void>((resolve) => {
                  const timer = setTimeout(async () => {
                     if (!signal.aborted) {
                        await ctx.reply('Шось там роблю');
                     }
                     resolve();
                  }, 20000);

                  signal.addEventListener('abort', () => {
                     clearTimeout(timer);
                     ctx.reply('abort...');
                  });
               });
            await timeout(ctx, abortSignal);
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

// try {
//    logUserInfo(ctx, 'command post');
//    if (hasNoAccess({ ctx })) return;
//    await sendArticle(ctx);
// } catch (error) {
//    const { code, message } = handleAppError(error);
//    replyError(ctx, { code, message });
// }
