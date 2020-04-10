import MarmokBot from "../client/marmokbot"
import { Message } from "discord.js"
import { Command } from "../typings/discordjs"

export default class CommandHandler {
  client: MarmokBot

  constructor(client) {
    this.client = client
  }

  async process(msg: Message) {
    const prefix = msg.guild.settings.prefix
    const doesToBotMention = msg.content.startsWith(`<@!${this.client.user.id}>`)

    if (!msg.content.startsWith(prefix) && !doesToBotMention) return
    
    let args: string[]
    if (doesToBotMention) {
      args = msg.content.substring(`<@!${this.client.user.id}>`.length).split(/\s/).slice(1)
    } else {
      args = msg.content.substring(prefix.length).split(/\s/)
    }

    let command: Command = this.findCommandByCategory(args) || this.findCommandByName(args)

    if (command) await command.run(msg, args)
  }

  private findCommandByCategory(args: string[]): Command | undefined {
    const query = this.client.commands.find(command => 
      command.category === args[0].toLowerCase() && 
      (command.name === args[1]?.toLowerCase() || command.aliases?.includes(args[1]?.toLowerCase()))
    )

    return query
  }

  private findCommandByName(args: string[]): Command | undefined {
    const query = this.client.commands.find(command => 
      command.name === args[0].toLowerCase() || command.aliases?.includes(args[0].toLowerCase())
    )

    return query
  }
}