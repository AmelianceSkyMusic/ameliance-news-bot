import { APP } from '../constants/app';
import { returnError as returnErr } from '../shared/_asm/scripts/return-error';

export function returnError(error: unknown): string {
   const { message } = returnErr(error, -1, `ERROR: ${APP.name}`, 1);
   return message;
}
