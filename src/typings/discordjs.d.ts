import { Client, ClientEvents, Guild, Message, GuildMember } from "discord.js";
import MarmokBot from "../client/marmokbot";
import Settings from "../stores/Settings";
import { User as DBUser } from "../models/User";
import CommandStore from "../stores/Commands";
import EventStore from "../stores/Events";

declare module 'discord.js' {
  export interface Client {
    connected: boolean,
    events: Collection<string, Event>,
    commands: Collection<string, Command>,
    stores?: {
      commands: CommandStore,
      events: EventStore,
      settings: {
        prefix: import('../settings/prefix').default
      }
    }
  }
  export interface Guild {
    settings: {
      prefix?: string
    }
  }
  export interface GuildMember {
    db: DBUser,
    fetchDbData(): Promise<DBUser>
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
  aliases?: string[],
  cooldown?: {
    type: 'user' | 'global',
    time: number,
  },
  category?: string,
}

