import { bot } from '../../../api/bot';
import { getRandomNumber } from '../../shared/_asm/scripts/get-random-number';
import { handleAppError } from '../../shared/helpers/handle-app-error';
import { hasNoAccess } from '../../shared/helpers/has-no-access';
import { logUserInfo } from '../../shared/helpers/log-user-info';
import { runWithRandomInterval } from '../../shared/helpers/run-with-random-interval';
import { sendNewsPost } from './helpers/send-news-post';

const oneMinInMs = 1000 * 60;
const minIntervalInMs = oneMinInMs * 30; //* 30min
const maxIntervalInMs = oneMinInMs * 60; //* 60min

export function postInterval() {
   bot.command('postInterval', (ctx) => {
      try {
         logUserInfo(ctx, 'post interval');
         if (hasNoAccess({ ctx })) return;

         const randomInterval = getRandomNumber(minIntervalInMs, maxIntervalInMs);

         runWithRandomInterval(async () => {
            await sendNewsPost(ctx);
         }, randomInterval);
      } catch (error) {
         handleAppError(error);
      }
   });
}
