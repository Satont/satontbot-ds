import { Command } from "../../typings/discordjs";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import SatontBot from "../../client/satontbot";

export default class AliasAdd implements Command {
  client: SatontBot
  name = 'remove'
  description = 'Remove alias for some command. ➖'
  category = 'alias'

  constructor(client) {
    this.client = client
  }

  async run(message: Message, args: string[]) {
    const aliasName = args[0].toLocaleLowerCase()

    if (!aliasName) return
    
    await this.client.stores.commands.removeAlias(aliasName)

    const embed = new MessageEmbed()
      .setColor('03fcdf')
      .setDescription(`Alias "${aliasName}" was removed.`)

    return message.reply(embed)
  }
}