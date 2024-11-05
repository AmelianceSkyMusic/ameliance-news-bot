import { handleAppError } from './handle-app-error';
import { prepareEditMessageText } from './prepare-edit-message-text';
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
   const timeout = new Promise<void>((resolve) =>
      setTimeout(() => {
         console.warn('Operation timed out');
         resolve();
      }, timeoutMs),
   );

   let replyResponse;

   try {
      if (statusMessage) {
         replyResponse = await replyHTML(ctx, statusMessage);
      }
      await Promise.race([callback(ctx), timeout]);
   } catch (error) {
      if (replyResponse) {
         const updateMessageText = await prepareEditMessageText(ctx, replyResponse);
         await updateMessageText('Сарян, братан, я обідаю...');
      }
      handleAppError(error);
   } finally {
      if (replyResponse) await removeMessageById({ ctx, messageId: replyResponse.message_id });
   }
}
