import { bot } from '../../../api/bot';
import { ENV } from '../../constants/env';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { hasNoAccess } from '../../shared/helpers/has-no-access';
import { logUserInfo } from '../../shared/helpers/log-user-info';
import { replyError } from '../../shared/helpers/reply-error';
import { runWithTimeout } from '../../shared/helpers/run-with-timeout';
import { generateBimbaPostAsHTML } from '../helpers/generate-bimba-post-as-html';

export function message() {
   bot.on(
      'message',
      async (ctx) =>
         await runWithTimeout(
            ctx,
            async () => {
               try {
                  console.log('ctx: ', ctx);
                  logUserInfo(ctx, 'on message');
                  if (hasNoAccess({ ctx })) return;
                  console.time('on message');
                  const text = ctx.msg.caption;

                  const postPhoto = ctx.msg.photo?.[0].file_id || '';
                  if (!postPhoto) return;

                  const articleText = text?.split('\n').splice(1).join('\n').trim();
                  if (!articleText) return;

                  const postAsHTML = await generateBimbaPostAsHTML(ctx, { text: articleText });
                  if (!postAsHTML) return;

                  // await ctx.replyWithPhoto(postPhoto, {
                  //    caption: postAsHTML,
                  //    parse_mode: 'HTML',
                  //    reply_markup: onMessagePostMenu,
                  // });

                  await ctx.api.sendPhoto(Number(ENV.BIMBA_NEWS_ID), postPhoto, {
                     caption: postAsHTML,
                     parse_mode: 'HTML',
                  });
               } catch (error) {
                  const { code, message } = handleAppError(error);
                  replyError(ctx, { code, message });
               } finally {
                  console.timeEnd('on message');
               }
            },
            'О, бачу є для мене робота...',
         ),
   );
}
