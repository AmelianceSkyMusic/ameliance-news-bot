import { bot } from '../../../api/bot';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { hasNoAccess } from '../../shared/helpers/has-no-access';
import { logUserInfo } from '../../shared/helpers/log-user-info';
import { replyError } from '../../shared/helpers/reply-error';
import { sendNewsPost } from '../helpers/send-news-post';

export function post() {
   bot.command('post', async (ctx) => {
      try {
         console.time('command post');
         logUserInfo(ctx, 'command post');
         if (hasNoAccess({ ctx })) return;

         await sendNewsPost(ctx);
         console.timeEnd('command post');
      } catch (error) {
         const { code, message } = handleAppError(error);
         replyError(ctx, { code, message });
      }
   });
}
