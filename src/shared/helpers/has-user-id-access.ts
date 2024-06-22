import { ENV } from '../../constants/env';

import { Context } from 'grammy';

export function hasUserIdAccess(ctx: Context, userIdWithAccess: (string | number)[] = []) {
   const userIds = String(ENV.USER_IDS_WITH_ACCESS);
   const accessUserIds = [...userIds.split(','), ...userIdWithAccess];
   const currentUserId = String(ctx.msg?.from?.id);
   const hasAccessMatch = accessUserIds.includes(currentUserId);
   return hasAccessMatch;
}
