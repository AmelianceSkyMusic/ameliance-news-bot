import { getTextFromHTML } from '../../shared/helpers/get-text-form-html';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { replyError } from '../../shared/helpers/reply-error';
import { generateBimbaPostAsHTML } from './generate-bimba-post-as-html';
import { getArticleData } from './get-article-data';

import { Context, InputFile } from 'grammy';

export async function sendNewsPost(ctx: Context) {
   try {
      console.time('get article');
      const respArticle = await getArticleData(ctx);
      if (!respArticle || 'code' in respArticle) return;
      const { article, html } = respArticle;
      console.timeEnd('get article');

      const {
         title,
         publishedAt,
         url,
         image,
         source: { name },
      } = article;

      ctx.reply(
         `<b>title:</b> ${title}
<b>publishedAt:</b> ${publishedAt}
<b>url:</b> ${url}
<b>name:</b> ${name}`,
         {
            parse_mode: 'HTML',
         },
      );

      const text = getTextFromHTML(html);

      const postAsHTML = await generateBimbaPostAsHTML(ctx, { title, text });
      if (!postAsHTML) return;

      await ctx.api.sendPhoto(Number(process.env.BIMBA_NEWS_ID), new InputFile(new URL(image)), {
         caption: postAsHTML,
         parse_mode: 'HTML',
      });
   } catch (error) {
      const { code, message } = handleAppError(error);
      replyError(ctx, { code, message });
   }
}
