import { APP } from '../../constants/app';
import { handleAppError } from './handle-app-error';
import { removeMessageById } from './remove-message-by-id';
import { replyHTML } from './reply-html';

import { Context } from 'grammy';

type AsyncCallback = (ctx: Context) => Promise<void>;

export async function runWithTimeout(
   ctx: Context,
   callback: AsyncCallback,
   statusMessage?: string,
   timeoutMs: number = 9000,
) {
   console.time('1');
   console.time('2');
   console.time('3');
   console.time('4');
   const timeout = new Promise<void>((resolve) =>
      setTimeout(async () => {
         console.time('2');
         console.warn(`${APP.name} > Operation timed out`);
         const warnMessageResp = await replyHTML(ctx, 'Сарян, братан, я обідаю...');
         await removeMessageById({ ctx, messageId: warnMessageResp.message_id });
         resolve();
      }, timeoutMs),
   );

   let replyResp;
   try {
      if (statusMessage) replyResp = await replyHTML(ctx, statusMessage);
      console.log('Starting callback execution...');
      await Promise.race([callback(ctx), timeout]);
      console.log('Callback execution completed successfully.');
      console.time('3');
   } catch (error) {
      console.error('Error in callback:', error);
      handleAppError(error);
      console.time('4');
   } finally {
      if (replyResp) await removeMessageById({ ctx, messageId: replyResp.message_id });
      console.timeEnd('1');
   }
}
