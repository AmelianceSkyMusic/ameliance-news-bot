import { bot } from '../../../api/bot';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { hasNoAccess } from '../../shared/helpers/has-no-access';
import { logUserInfo } from '../../shared/helpers/log-user-info';
import { sendNewsPost } from '../helpers/send-news-post';

export function post() {
   bot.command('post', async (ctx) => {
      try {
         logUserInfo(ctx, 'command post');
         if (hasNoAccess({ ctx })) return;

         try {
            await sendNewsPost(ctx);
         } catch (error) {
            console.log('error: ');
         }
      } catch (error) {
         handleAppError(error);
      }
   });
}
