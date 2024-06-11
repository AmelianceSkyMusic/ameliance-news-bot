import { getTextFromHTML } from '../../shared/helpers/get-text-form-html';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { generateBimbaPostAsHTMLWithTitle } from './generate-bimba-post-as-html-with-title';
import { getArticleData } from './get-article-data';

import { Context, InputFile } from 'grammy';

export async function sendNewsPost(ctx: Context) {
   try {
      const respArticle = await getArticleData();
      if (!respArticle || 'code' in respArticle) return;
      const { article, html } = respArticle;

      const text = getTextFromHTML(html);

      const postAsHTML = await generateBimbaPostAsHTMLWithTitle(article.title, text);
      if (!postAsHTML) return;

      const {
         title,
         publishedAt,
         url,
         source: { name },
      } = article;

      console.log('article: ', { title, publishedAt, url, name });
      ctx.api.sendPhoto(Number(process.env.BIMBA_NEWS_ID), new InputFile(new URL(article.image)), {
         caption: postAsHTML,
         parse_mode: 'HTML',
      });
   } catch (error) {
      handleAppError(error);
   }
}
