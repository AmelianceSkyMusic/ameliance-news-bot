import { onMessagePostMenu } from '../../../api/bot';
import { ENV } from '../../constants/env';
import { api } from '../../shared/_asm/api';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { replyError } from '../../shared/helpers/reply-error';
import { generateBimbaPostAsHTML } from './generate-bimba-post-as-html';
import { getCollectedArticleList } from './get-collected-article-list';
import { getFreshArticle } from './get-fresh-article';
import { getHTMLData } from './get-html-data';
import { getTextFromHTML } from './get-text-form-html';

import { Context, InputFile } from 'grammy';

export async function sendArticle(ctx: Context) {
   try {
      const collectedArticleList = await getCollectedArticleList(ctx);

      if (!collectedArticleList) return;
      const respArticle = await getFreshArticle(ctx, collectedArticleList);
      if (!respArticle) return;

      const {
         title,
         publishedAt,
         url,
         image,
         source: { name },
      } = respArticle;

      ctx.reply(
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

      const htmlData = await getHTMLData(ctx, url);

      if (!htmlData) return;
      const textContent = getTextFromHTML(ctx, htmlData);
      if (!textContent) return;

      const postAsHTML = await generateBimbaPostAsHTML(ctx, { title, text: textContent });
      if (!postAsHTML) return;

      await ctx.api.sendPhoto(Number(ENV.BIMBA_NEWS_ID), new InputFile(new URL(image)), {
         caption: postAsHTML,
         parse_mode: 'HTML',
      });

      api.google.appsscript.postTitledColumnsDataByTitles({
         titlesParams: { title, publishedAt, url, name, image },
         spreadsheetId: ENV.GOOGLE_DATA_TABLE_ID || '',
         sheetName: 'news',
      });
   } catch (error) {
      const { code, message } = handleAppError(error);
      replyError(ctx, { code, message });
   }
}
