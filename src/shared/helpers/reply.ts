import { generateUserFullNameTag } from './generate-user-full-name-tag';

import type { Context } from 'grammy';
import type { Message } from 'grammy/types';

export async function reply(
   ctx: Context,
   text: string,
   mode?: 'mention' | '',
   replyMessageId?: number,
   params: Record<string, string> = {},
): Promise<Message.TextMessage> {
   const newText = mode === 'mention' ? `${generateUserFullNameTag(ctx)}, ${text}` : text;

   const newReplyMessageId = replyMessageId || ctx.msg?.message_id;

   const replyResponse = await ctx.reply(newText, {
      reply_to_message_id: newReplyMessageId,
      ...params,
   });

   return replyResponse;
}
