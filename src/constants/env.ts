import 'dotenv/config';

export const MODE = process.env.MODE || 'prod';

export const ENV = {
   BIMBA_NEWS_ID:
      (MODE === 'dev' ? process.env.DEV__BIMBA_NEWS_ID : process.env.BIMBA_NEWS_ID) ||
      process.env.BIMBA_NEWS_ID,

   GOOGLE_DATA_TABLE_ID:
      (MODE === 'dev' ? process.env.DEV__GOOGLE_DATA_TABLE_ID : process.env.GOOGLE_DATA_TABLE_ID) ||
      process.env.GOOGLE_DATA_TABLE_ID,

   BOT_TOKEN:
      (MODE === 'dev' ? process.env.DEV__BOT_TOKEN : process.env.BOT_TOKEN) ||
      process.env.BOT_TOKEN,

   G_NEWS_API_KEY:
      (MODE === 'dev' ? process.env.DEV__G_NEWS_API_KEY : process.env.G_NEWS_API_KEY) ||
      process.env.G_NEWS_API_KEY,

   CHANNEL_IDS_WITH_ACCESS:
      (MODE === 'dev'
         ? process.env.DEV__CHANNEL_IDS_WITH_ACCESS
         : process.env.CHANNEL_IDS_WITH_ACCESS) || process.env.CHANNEL_IDS_WITH_ACCESS,

   CHAT_IDS_WITH_ACCESS:
      (MODE === 'dev' ? process.env.DEV__CHAT_IDS_WITH_ACCESS : process.env.CHAT_IDS_WITH_ACCESS) ||
      process.env.CHAT_IDS_WITH_ACCESS,

   USER_IDS_WITH_ACCESS:
      (MODE === 'dev' ? process.env.DEV__USER_IDS_WITH_ACCESS : process.env.USER_IDS_WITH_ACCESS) ||
      process.env.USER_IDS_WITH_ACCESS,

   USERNAMES_WITH_ACCESS:
      (MODE === 'dev'
         ? process.env.DEV__USERNAMES_WITH_ACCESS
         : process.env.USERNAMES_WITH_ACCESS) || process.env.USERNAMES_WITH_ACCESS,

   GOOGLE_GEMINI_API:
      (MODE === 'dev' ? process.env.DEV__GOOGLE_GEMINI_API : process.env.GOOGLE_GEMINI_API) ||
      process.env.GOOGLE_GEMINI_API,
};
