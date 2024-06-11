import { handleAppError } from '../../shared/helpers/handle-app-error';
import { Article, GNews } from '../../types/gnews';

const articleHistory = [] as Array<string>;

export async function getArticleData() {
   try {
      const respNews = await fetch(
         `https://gnews.io/api/v4/top-headlines?country=ua&category=general&apikey=${process.env.G_NEWS_API_KEY}`,
      );
      const newsData: GNews = await respNews.json();
      console.log('newsData: ', newsData);

      if (newsData && 'errors' in newsData) return handleAppError(newsData.errors[0]);

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
      const data = await fetch(article.url);
      const html = await data.text();
      return { article, html };
   } catch (error) {
      handleAppError(error);
   }
}
