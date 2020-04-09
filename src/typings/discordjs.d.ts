import { Client, ClientEvents } from "discord.js";

declare module 'discord.js' {
  interface Client {
    connected: boolean
  }
}