import { onMessagePostMenu } from '../../../api/bot';
import { ENV } from '../../constants/env';
import { api } from '../../shared/_asm/api';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { replyError } from '../../shared/helpers/reply-error';
import { getCollectedArticleList } from './get-collected-article-list';
import { getFreshArticle } from './get-fresh-article';

import { Context } from 'grammy';

export async function sendArticleToSheet(ctx: Context) {
   try {
      const collectedArticleList = await getCollectedArticleList(ctx);

      const respArticle = await getFreshArticle(ctx, collectedArticleList);
      if (!respArticle) {
         await ctx.reply('NO FRESH ARTICLE!😢');
         return;
      }

      const {
         title,
         publishedAt,
         url,
         image,
         source: { name },
      } = respArticle;

      const resp = await api.google.appsscript.postTitledColumnsDataByTitles({
         titlesParams: { title, publishedAt, url, name, image },

         spreadsheetId: ENV.GOOGLE_DATA_TABLE_ID || '',
         sheetName: 'news',
      });
      if (!(resp.status === 'success')) return;

      await ctx.reply(
         `<b>title:</b> ${title}
<b>publishedAt:</b> ${publishedAt}
<b>url:</b> ${url}
<b>name:</b> ${name}
<b>image:</b> ${image}`,
         {
            parse_mode: 'HTML',
            reply_markup: onMessagePostMenu,
         },
      );
   } catch (error) {
      const { code, message } = handleAppError(error);
      replyError(ctx, { code, message });
   }
}
