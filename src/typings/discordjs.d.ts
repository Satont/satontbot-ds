import { Client, ClientEvents, Guild, Message } from "discord.js";
import MarmokBot from "../client/marmokbot";

declare module 'discord.js' {
  export interface Client {
    connected: boolean,
    events: Collection<string, Event>,
    commands: Collection<string, Command>
  }
  export interface Guild {
    settings: {
      prefix?: string
    }
  }
}

export interface Event {
  client?: MarmokBot
  name: string,
  run(...args: ClientEvents[keyof ClientEvents]): Promise<void> | void,
  init?(): Promise<any> | any | void,
  once?: boolean,
}

export interface Command {
  client?: MarmokBot,
  name: string,
  run(message: Message, args: string[]): Promise<any> | any | void,
  init?(): Promise<any> | any | void,
  description?: string,
  aliases?: string[]
}

