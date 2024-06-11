import { APP } from '../../constants/app';
import { ReturnError, returnError } from '../_asm/scripts/return-error';

export type HandleAppError = ReturnError;

export function handleAppError(error: unknown, code?: number): ReturnError {
   return returnError(error, code, APP.name, 1, 1);
}
