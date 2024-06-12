import { APP } from '../../constants/app';
import { ReturnError } from '../_asm/scripts/return-error';

import { Context } from 'grammy';

export function replyError(ctx: Context, error: ReturnError) {
   ctx.reply(`<b>ERROR:</b><pre>${APP.name} > ${error.code}:\n${error.message}</pre>`, {
      parse_mode: 'HTML',
   });
}
