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
): Promise<{ ok: boolean }> {
   const timeout = new Promise<{ ok: boolean }>((_, reject) =>
      setTimeout(async () => {
         reject(`${APP.name} > Operation timed out`);
      }, timeoutMs),
   );

   try {
      console.log('Starting callback execution...');
      await Promise.race([callback(ctx), timeout]);
      console.log('Callback execution completed successfully.');
      return { ok: true };
   } catch (error) {
      const warnMessageResp = await replyHTML(ctx, 'Сарян, братан, я обідаю...');
      await removeMessageById({ ctx, messageId: warnMessageResp.message_id });
      handleAppError(error);
      return { ok: false };
   }
}
