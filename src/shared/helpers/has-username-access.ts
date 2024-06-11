import 'dotenv/config';
import { Context } from 'grammy';

export function hasUsernameAccess(ctx: Context, usernameWithAccess: (string | number)[] = []) {
	const users = String(process.env.USERNAMES_WITH_ACCESS);
	const accessUsernames = [...users.toLocaleLowerCase().split(','), ...usernameWithAccess];
	const username = String(ctx.msg?.from?.username).toLocaleLowerCase();
	const hasAccessMatch = accessUsernames.includes(username);
	return hasAccessMatch;
}
