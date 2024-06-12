import { getCurrentTimeWithOffset } from '../_asm/scripts/get-current-time-with-offset';
import { getRandomNumber } from '../_asm/scripts/get-random-number';

import { Context } from 'grammy';

const oneMinInMs = 1000 * 60;

export async function runWithRandomInterval(
   ctx: Context,
   callback: () => void,
   min: number,
   max: number,
) {
   callback();

   console.time('runWithRandomInterval');
   const randomInterval = getRandomNumber(min, max) * oneMinInMs;
   ctx.reply(
      `Next post will be sent at: ${getCurrentTimeWithOffset(randomInterval)}\nPost delay: ${
         randomInterval / oneMinInMs
      } minutes`,
   );

   setTimeout(() => {
      console.timeEnd('runWithRandomInterval');
      runWithRandomInterval(ctx, callback, min, max);
   }, randomInterval);
}
