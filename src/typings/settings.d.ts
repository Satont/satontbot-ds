import { Guild } from "discord.js"

declare module 'discord.js' {
  interface Guild {
    settings: {
      prefix?: string,
    }
  }
}