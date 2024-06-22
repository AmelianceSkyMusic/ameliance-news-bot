import { handleAppError } from '../../shared/helpers/handle-app-error';
import { replyError } from '../../shared/helpers/reply-error';

import { Context } from 'grammy';

export async function getHTMLData(ctx: Context, url: string) {
   try {
      const data = await fetch(url);
      const html = await data.text();
      return html;
   } catch (error) {
      const { code, message } = handleAppError(error);
      replyError(ctx, { code, message });
   }
}
