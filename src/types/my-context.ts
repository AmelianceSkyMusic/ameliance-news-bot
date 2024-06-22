import { SessionData } from './session-data';

import { Context, SessionFlavor } from 'grammy';

export type MyContext = Context & SessionFlavor<SessionData>;
