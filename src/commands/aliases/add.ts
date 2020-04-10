import { Command } from "../../typings/discordjs";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import MarmokBot from "../../client/marmokbot";

export default class AliasAdd implements Command {
  client: MarmokBot
  name = 'add'
  description = 'Add alias for some command.'
  category = 'alias'

  constructor(client) {
    this.client = client
  }

  async run(message: Message, args: string[]) {
    const commandName = args[0].toLocaleLowerCase()
    const aliasName = args[1].toLocaleLowerCase()

    if (!commandName || !aliasName) return
    
    await this.client.stores.commands.addAlias(commandName, aliasName)

    const embed = new MessageEmbed()
      .setColor('03fcdf')
      .setDescription(`Alias "${aliasName}" for command "${commandName}" was added.`)

    return message.reply(embed)
  }
}