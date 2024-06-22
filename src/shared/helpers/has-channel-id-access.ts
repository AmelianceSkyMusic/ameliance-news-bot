import { ENV } from '../../constants/env';

import { Context } from 'grammy';

export function hasChannelIdAccess(ctx: Context, channelIdWithAccess: (string | number)[] = []) {
   const channels = String(ENV.CHANNEL_IDS_WITH_ACCESS);
   const accessChannels = [...channels.split(','), ...channelIdWithAccess];
   const currentChannels = String(ctx.msg?.chat.id);
   const hasAccessMatch = accessChannels.includes(currentChannels);
   return hasAccessMatch;
}
