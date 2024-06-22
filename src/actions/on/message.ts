import { bot } from '../../../api/bot';
import { ENV } from '../../constants/env';
import { api } from '../../shared/_asm/api';

export function message() {
   bot.on('message', async (ctx) => {
      const response = await api.google.appsscript.postTitledColumnsDataByTitles({
         titlesParams: { title: 'repliedMessageTest' },
         spreadsheetId: ENV.GOOGLE_DATA_TABLE_ID || '',
         sheetName: 'news',
      });
      console.log('---- response: ', response);
   });
}
// export function message() {
//    bot.on('message', async (ctx) => {
//       try {
//          console.log('ctx: ', ctx);
//          logUserInfo(ctx, 'on message');
//          if (hasNoAccess({ ctx })) return;
//          console.time('on message');
//          const text = ctx.msg.caption;

//          const postPhoto = ctx.msg.photo?.[0].file_id || '';
//          if (!postPhoto) return;

//          const articleText = text?.split('\n').splice(1).join('\n').trim();
//          if (!articleText) return;

//          const postAsHTML = await generateBimbaPostAsHTML(ctx, { text: articleText });
//          if (!postAsHTML) return;

//          // await ctx.replyWithPhoto(postPhoto, {
//          //    caption: postAsHTML,
//          //    parse_mode: 'HTML',
//          //    reply_markup: onMessagePostMenu,
//          // });

//          await ctx.api.sendPhoto(Number(ENV.BIMBA_NEWS_ID), postPhoto, {
//             caption: postAsHTML,
//             parse_mode: 'HTML',
//          });
//       } catch (error) {
//          const { code, message } = handleAppError(error);
//          replyError(ctx, { code, message });
//       } finally {
//          console.timeEnd('on message');
//       }
//    });
// }
