import { generateFullName } from './generate-full-name';
import { generateUserTag } from './generate-user-tag';

import { Context } from 'grammy';

export function generateUserFullNameTag(ctx: Context): string {
   const messageFrom = ctx.msg?.from;
   const messageUserId = messageFrom?.id;
   const messageUserFirstName = messageFrom?.first_name || '';
   const messageUserLastName = messageFrom?.last_name || '';
   const messageUserFullNameName = generateFullName(messageUserFirstName, messageUserLastName);

   return generateUserTag(messageUserId || '', messageUserFullNameName);
}
