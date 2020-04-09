import { Message } from 'discord.js'

export interface Command {
  client?: MarmokBot,
  name: string,
  run(message: Message, args: string[]): Promise<any> | any | void,
  init?(): Promise<any> | any | void,
  description?: string,
  aliases?: string[]
}