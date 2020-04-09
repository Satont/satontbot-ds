import { Client, ClientEvents, Guild } from "discord.js";
import { Event } from './events.d'
import { Command } from './events.d'

declare module 'discord.js' {
  interface Client {
    connected: boolean,
    events: Collection<string, Event>,
    commands: Collection<string, Command>
  }
  interface Guild {
    settings: {
      prefix?: string,
    }
  }
}