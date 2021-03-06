import { Client, ClientEvents, Guild, Message, GuildMember } from "discord.js";
import SatontBot from "../client/satontbot";
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
    fetchDbData(): Promise<DBUser>
  }
}

export interface Event {
  client?: SatontBot
  name: string,
  run(...args: any): Promise<void | any> | void | any,
  init?(): Promise<any> | any | void,
  once?: boolean,
}

export interface Command {
  client?: SatontBot,
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
  example?: string,
  args?: {
    [x: string]: {
      type: any,
      description: any,
    }
  }
}

