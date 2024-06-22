import { ENV } from '../../constants/env';

import { Context } from 'grammy';

export function hasChatIdAccess(ctx: Context, chatIdWithAccess: (string | number)[] = []) {
   const chats = String(ENV.CHAT_IDS_WITH_ACCESS);
   const accessChats = [...chats.split(','), ...chatIdWithAccess];
   const currentChat = String(ctx.message?.chat.id || ctx.editedMessage?.chat.id);
   const hasAccessMatch = accessChats.includes(currentChat);
   return hasAccessMatch;
}
