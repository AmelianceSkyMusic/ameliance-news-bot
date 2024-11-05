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
   const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs),
   );

   let replyResponse;

   try {
      if (statusMessage) {
         replyResponse = await replyHTML(ctx, statusMessage);
         console.log('replyResponse: ', replyResponse);
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
