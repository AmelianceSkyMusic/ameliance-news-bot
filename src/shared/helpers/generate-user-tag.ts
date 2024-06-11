import { UserId } from '../../types/user-id';

export function generateUserTag(userId: UserId, userName: string): string {
   return `<a href="tg://user?id=${userId}">${userName}</a>`;
}
