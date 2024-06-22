import { ENV } from '../../constants/env';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { replyError } from '../../shared/helpers/reply-error';
import { Article, GNews } from '../../types/gnews';

import { Context } from 'grammy';

export async function getFreshArticle(ctx: Context, prevTitles?: string[] | null) {
   try {
      const respNews = await fetch(
         `https://gnews.io/api/v4/top-headlines?country=ua&category=general&apikey=${ENV.G_NEWS_API_KEY}`,
      );
      const newsData: GNews = await respNews.json();

      if (newsData && 'errors' in newsData) {
         const { code, message } = handleAppError(newsData.errors[0]);
         replyError(ctx, { code, message });
         return;
      }

      let article: Article | null = null;
      if (prevTitles && prevTitles.length < 0) return newsData.articles[0];

      for (let i = 0; i < newsData.articles.length; i++) {
         const comparedArticle = newsData.articles[i];
         const articleTitle = comparedArticle.title.trim();
         const isPosted = prevTitles?.includes(articleTitle);
         if (!isPosted) {
            article = newsData.articles[i];
            break;
         }
      }

      if (!article) return;
      return article;
   } catch (error) {
      const { code, message } = handleAppError(error);
      replyError(ctx, { code, message });
   }
}
