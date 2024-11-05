import { bot } from '../../../api/bot';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { hasNoAccess } from '../../shared/helpers/has-no-access';
import { logUserInfo } from '../../shared/helpers/log-user-info';
import { replyError } from '../../shared/helpers/reply-error';
import { runWithTimeout } from '../../shared/helpers/run-with-timeout';
import { sendArticle } from '../helpers/send-article';

export function post() {
   bot.command(
      'post',
      async (ctx) =>
         await runWithTimeout(
            ctx,
            async () => {
               try {
                  logUserInfo(ctx, 'command post');
                  if (hasNoAccess({ ctx })) return;

                  await sendArticle(ctx);
               } catch (error) {
                  const { code, message } = handleAppError(error);
                  replyError(ctx, { code, message });
               }
            },
            'О, бачу є для мене робота...',
         ),
   );
}
