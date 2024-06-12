import { getTextFromHTML } from '../../shared/helpers/get-text-form-html';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { replyError } from '../../shared/helpers/reply-error';
import { generateBimbaPostAsHTMLWithTitle } from './generate-bimba-post-as-html-with-title';
import { getArticleData } from './get-article-data';

import { Context, InputFile } from 'grammy';

export async function sendNewsPost(ctx: Context) {
   try {
      const respArticle = await getArticleData(ctx);
      if (!respArticle || 'code' in respArticle) return;
      const { article, html } = respArticle;

      const {
         title,
         publishedAt,
         url,
         source: { name },
      } = article;
      console.log('article: ', { title, publishedAt, url, name });
      ctx.reply(
         `<b>title:</b> ${title}
<b>publishedAt:</b> ${publishedAt}
<b>url:</b> ${url}
<b>name:</b> ${name}
`,
         {
            parse_mode: 'HTML',
         },
      );

      const text = getTextFromHTML(html);

      const postAsHTML = await generateBimbaPostAsHTMLWithTitle(article.title, text, ctx);
      if (!postAsHTML) return;

      ctx.api.sendPhoto(Number(process.env.BIMBA_NEWS_ID), new InputFile(new URL(article.image)), {
         caption: postAsHTML,
         parse_mode: 'HTML',
      });

      ctx.replyWithPhoto(new InputFile(new URL(article.image)), {
         caption: postAsHTML,
         parse_mode: 'HTML',
      });
   } catch (error) {
      const { code, message } = handleAppError(error);
      replyError(ctx, { code, message });
   }
}
