import { Message } from 'discord.js'

export interface Command {
  client?: MarmokBot,
  name: string,
  run(message: Message): Promise<any> | any | void,
  init?(): Promise<any> | any | void,
  description?: string,
}