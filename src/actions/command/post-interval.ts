import { bot } from '../../../api/bot';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { hasNoAccess } from '../../shared/helpers/has-no-access';
import { logUserInfo } from '../../shared/helpers/log-user-info';
import { replyError } from '../../shared/helpers/reply-error';
import { runWithRandomInterval } from '../../shared/helpers/run-with-random-interval';
import { runWithTimeout } from '../../shared/helpers/run-with-timeout';
import { sendArticle } from '../helpers/send-article';

export function postInterval() {
   bot.command(
      'postInterval',
      async (ctx) =>
         await runWithTimeout(
            ctx,
            async () => {
               try {
                  logUserInfo(ctx, 'command post interval');
                  if (hasNoAccess({ ctx })) return;

                  runWithRandomInterval(
                     ctx,
                     async () => {
                        await sendArticle(ctx);
                     },
                     10,
                     15,
                  );
               } catch (error) {
                  const { code, message } = handleAppError(error);
                  replyError(ctx, { code, message });
               }
            },
            'О, бачу є для мене робота...',
         ),
   );
}
