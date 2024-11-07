import { APP } from '../../constants/app';
import { handleAppError } from './handle-app-error';
import { removeMessageById } from './remove-message-by-id';
import { replyHTML } from './reply-html';

import { Context } from 'grammy';

type AsyncCallback = (ctx: Context) => Promise<void>;

export async function runWithTimeout(
   ctx: Context,
   callback: AsyncCallback,
   timeoutMs: number = 9000,
) {
   const timeout = new Promise<void>((resolve) =>
      setTimeout(async () => {
         console.warn(`${APP.name} > Operation timed out`);
         const warnMessageResp = await replyHTML(ctx, 'Сарян, братан, я обідаю...');
         await removeMessageById({ ctx, messageId: warnMessageResp.message_id });
         resolve();
      }, timeoutMs),
   );

   try {
      console.log('Starting callback execution...');
      const result = await Promise.race([callback(ctx), timeout]);
      console.log('result: ', result);
      console.log('Callback execution completed successfully.');
   } catch (error) {
      handleAppError(error);
   }
}
