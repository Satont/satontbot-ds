import { Command } from "../../typings/discordjs";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import MarmokBot from "../../client/marmokbot";

export default class Prefix implements Command {
  client: MarmokBot
  name = 'prefix'
  description = 'Print prefix for commands on current guild.'
  aliases = ['prfx']

  constructor(client) {
    this.client = client
  }

  async run(message: Message) {
    const embed = new MessageEmbed()
      .setColor('03fcdf')
      .setDescription(`Current prefix for this guild: "${message.guild.settings.prefix}"`)

    return message.reply(embed)
  }
}