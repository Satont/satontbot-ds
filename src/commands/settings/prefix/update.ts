import { Command } from "../../../typings/discordjs";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import MarmokBot from "../../../client/marmokbot";

export default class Prefix implements Command {
  client: MarmokBot
  name = 'update'
  description = 'Update command prefix. 🔄'
  category = 'prefix'

  constructor(client) {
    this.client = client
  }

  async run(message: Message, args: string[]) {
    await this.client.stores.settings.prefix.update(message.guild, args[0])
    const embed = new MessageEmbed()
      .setColor('03fcdf')
      .setDescription(`Prefix was updated to "${args[2]}"`)

    return message.reply(embed)
  }
}