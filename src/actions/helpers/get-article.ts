import { ENV } from '../../constants/env';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { replyError } from '../../shared/helpers/reply-error';
import { Article, GNews } from '../../types/gnews';

import { Context } from 'grammy';

const articleHistory = [] as Array<string>;

export async function getArticle(ctx: Context) {
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

      for (let i = 0; i < newsData.articles.length; i++) {
         article = newsData.articles[i];
         const articleTitle = article.title;
         const isPosted =
            articleHistory.length > 0 ? articleHistory?.includes(articleTitle) : false;
         if (!isPosted) {
            articleHistory.push(articleTitle);
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
