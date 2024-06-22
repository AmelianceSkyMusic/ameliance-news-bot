import { ENV } from '../../constants/env';
import { api } from '../../shared/_asm/api';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { replyError } from '../../shared/helpers/reply-error';

import { Context } from 'grammy';

export async function getCollectedArticleList(ctx: Context) {
   try {
      const respGet = await api.google.appsscript.getTitledColumnsDataByTitles({
         columnTitles: ['title'],
         spreadsheetId: ENV.GOOGLE_DATA_TABLE_ID || '',
         sheetName: 'news',
      });
      let lastTitles = [] as string[];
      if (respGet.status === 'success') {
         lastTitles = respGet?.data?.title?.values?.map((item) => item.value.trim()) || [];
      }

      return lastTitles.length > 0 ? lastTitles : null;
   } catch (error) {
      const { code, message } = handleAppError(error);
      replyError(ctx, { code, message });
   }
}
