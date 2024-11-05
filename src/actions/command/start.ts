import { bot } from '../../../api/bot';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { hasNoAccess } from '../../shared/helpers/has-no-access';
import { logUserInfo } from '../../shared/helpers/log-user-info';
import { runWithTimeout } from '../../shared/helpers/run-with-timeout';

export function start() {
   bot.command(
      'start',
      async (ctx) =>
         await runWithTimeout(
            ctx,
            async () => {
               try {
                  logUserInfo(ctx, 'command start');
                  if (hasNoAccess({ ctx })) return;

                  ctx.reply('Ласкаво просимо! Що треба?');
               } catch (error) {
                  handleAppError(error);
               }
            },
            'О, бачу є для мене робота...',
         ),
   );
}
