import { bot } from '../../../api/bot';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { hasNoAccess } from '../../shared/helpers/has-no-access';
import { logUserInfo } from '../../shared/helpers/log-user-info';
import { replyError } from '../../shared/helpers/reply-error';
import { runWithTimeout } from '../../shared/helpers/run-with-timeout';
import { sendArticleToSheet } from '../helpers/send-article-to-sheet';

export function collectPost() {
   bot.command(
      'collectPost',
      async (ctx) =>
         await runWithTimeout(ctx, async () => {
            try {
               logUserInfo(ctx, 'command collectPost');
               if (hasNoAccess({ ctx })) return;

               await sendArticleToSheet(ctx);
            } catch (error) {
               const { code, message } = handleAppError(error);
               replyError(ctx, { code, message });
            }
         }),
   );
}
