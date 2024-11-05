import { reply } from './reply';

import { Context } from 'grammy';
import { Message } from 'grammy/types';

export async function replyHTML(
   ctx: Context,
   text: string,
   mode: 'mention' | '' = '',
   replyMessageId?: number,
   params: Record<string, string> = {},
): Promise<Message.TextMessage> {
   const replyResponse = await reply(ctx, text, mode, replyMessageId, {
      parse_mode: 'HTML',
      ...params,
   });

   return replyResponse;
}
