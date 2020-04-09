import { ClientEvents } from 'discord.js'
import MarmokBot from '../client/marmokbot';

export interface Event {
  client?: MarmokBot
  name: string,
  run(...args: ClientEvents[keyof ClientEvents]): Promise<void> | void,
  [x: string]: any
}