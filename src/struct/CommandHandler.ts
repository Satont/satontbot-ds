import SatontBot from "../client/satontbot"
import { Message } from "discord.js"
import { Command } from "../typings/discordjs"

export default class CommandHandler {
  client: SatontBot

  constructor(client) {
    this.client = client
  }

  async process(msg: Message, args: string[]) {
    let command: Command = this.findCommandByCategory(args)

    if (command) {
      await command.run(msg, args.slice(2))
    } else {
      command = this.findCommandByName(args)
      if (command) await command.run(msg, args.slice(1))
    }
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