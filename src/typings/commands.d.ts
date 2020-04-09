import { Message } from 'discord.js'
import MarmokBot from "../client/marmokbot";

export interface Command {
  client?: MarmokBot,
  name: string,
  run(message: Message, args: string[]): Promise<any> | any | void,
  init?(): Promise<any> | any | void,
  description?: string,
  aliases?: string[]
}
