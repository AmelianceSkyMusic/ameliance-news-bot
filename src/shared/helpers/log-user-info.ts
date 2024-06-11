import { getCurrentMessageChatInfo } from './get-current-message-chat-info';
import { getCurrentMessageUserInfo } from './get-current-message-user-info';

import { Context } from 'grammy';

export function logUserInfo(ctx: Context, message?: string) {
   const userInfo = getCurrentMessageUserInfo(ctx);
   const chatInfo = getCurrentMessageChatInfo(ctx);
   const user = `\n  ┌ user: ${userInfo}`;
   const chat = `\n  └ in: ${chatInfo}`;
   const msg = message ? ` ${message}` : '';
   console.log(`> [${new Date().toLocaleString()}]:${msg}${user}${chat}\n`);
}
