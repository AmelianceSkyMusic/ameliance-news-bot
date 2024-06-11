import { bot } from '../../../api/bot';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { hasNoAccess } from '../../shared/helpers/has-no-access';
import { logUserInfo } from '../../shared/helpers/log-user-info';

export function start() {
   bot.command('start', (ctx) => {
      try {
         logUserInfo(ctx, 'command start');
         if (hasNoAccess({ ctx })) return;

         ctx.reply('Ласкаво просимо! Що треба?');
      } catch (error) {
         handleAppError(error);
      }
   });
}
