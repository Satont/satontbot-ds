import SatontBot from "../client/satontbot"
import { Message, MessageEmbed } from "discord.js"
import { Command } from "../typings/discordjs"

export default class CommandHandler {
  client: SatontBot

  constructor(client) {
    this.client = client
  }

  async process(msg: Message, args: string[]) {
    let command: Command = this.findCommandByCategory(args)
    try {
      if (command) {
        await command.run(msg, args.slice(2))
      } else {
        command = this.findCommandByName(args)
        if (command) await command.run(msg, args.slice(1))
      }
    } catch (e) {
      if (e instanceof Error) return msg.reply(`error in bot code. Please, please feedback to administrator.`)
      else msg.reply(this.buildErrorEmbed({ errorMessage: e, prefix: msg.guild.settings.prefix, example: command.example, commandArgs: command.args }))
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

  buildErrorEmbed({ errorMessage, example, prefix, commandArgs }: { errorMessage: string, example?: string, prefix: string, commandArgs: Command["args"] }) {
    const embed = new MessageEmbed({
      color: 'FD0000',
      title: errorMessage,
      fields: []
    })
    if (example) {
      embed.description = `Example of usage: \`${prefix}${example}\`\nList of arguments:`
    }
    if (commandArgs) {
      for (const [argName, argOpts] of Object.entries(commandArgs)) {
        embed.fields.push({
          name: `${argName}(${argOpts.type})`,
          value: argOpts.description,
          inline: true,
        })
      }
    }

    return embed
  }
}