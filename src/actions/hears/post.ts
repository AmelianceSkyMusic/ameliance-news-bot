import { bot } from '../../../api/bot';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { hasNoAccess } from '../../shared/helpers/has-no-access';
import { logUserInfo } from '../../shared/helpers/log-user-info';
import { replyError } from '../../shared/helpers/reply-error';
import { generateBimbaPostAsHTML } from '../helpers/generate-bimba-post-as-html';

export function post() {
   bot.hears(/^post/i, async (ctx) => {
      try {
         logUserInfo(ctx, 'hears post');
         if (hasNoAccess({ ctx })) return;
         const text = ctx.msg.caption;
         const articleText = text?.split('\n').splice(1).join('\n').trim();
         if (!articleText) return;

         const photoUrl = ctx.msg.photo?.[0].file_id;
         if (!photoUrl) return;

         const postAsHTML = await generateBimbaPostAsHTML(articleText, ctx);
         if (!postAsHTML) return;

         ctx.api.sendPhoto(Number(process.env.BIMBA_NEWS_ID), photoUrl, {
            caption: postAsHTML,
            parse_mode: 'HTML',
         });
      } catch (error) {
         const { code, message } = handleAppError(error);
         replyError(ctx, { code, message });
      }
   });
}
