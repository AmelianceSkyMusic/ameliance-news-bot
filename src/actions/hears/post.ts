import { bot, onMessagePostMenu } from '../../../api/bot';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { hasNoAccess } from '../../shared/helpers/has-no-access';
import { logUserInfo } from '../../shared/helpers/log-user-info';
import { replyError } from '../../shared/helpers/reply-error';
import { runWithTimeout } from '../../shared/helpers/run-with-timeout';
import { generateBimbaPostAsHTML } from '../helpers/generate-bimba-post-as-html';

export function post() {
   bot.hears(
      /^post/i,
      async (ctx) =>
         await runWithTimeout(
            ctx,
            async () => {
               try {
                  logUserInfo(ctx, 'hears post');
                  if (hasNoAccess({ ctx })) return;
                  const text = ctx.msg.caption;
                  const articleText = text?.split('\n').splice(1).join('\n').trim();
                  if (!articleText) return;

                  const postPhoto = ctx.msg.photo?.[0].file_id;
                  if (!postPhoto) return;

                  const postAsHTML = await generateBimbaPostAsHTML(ctx, { text: articleText });
                  if (!postAsHTML) return;

                  await ctx.replyWithPhoto(postPhoto, {
                     caption: postAsHTML,
                     parse_mode: 'HTML',
                     reply_markup: onMessagePostMenu,
                  });
               } catch (error) {
                  const { code, message } = handleAppError(error);
                  replyError(ctx, { code, message });
               }
            },
            'О, бачу є для мене робота...',
         ),
   );
}
