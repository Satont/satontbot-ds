import { Command } from "../../typings/commands";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import MarmokBot from "../../client/marmokbot";

export default class Test implements Command {
  client: MarmokBot
  name = 'stats'
  description = 'Shows bot statistic.'

  constructor(client) {
    this.client = client
  }

  async run(message: Message) {
    const author = await this.client.users.fetch('266632783336570880')
    const embed = new MessageEmbed()
      .setColor('03fcdf')
      .setTitle('Bot stats')
      .setAuthor(author.username, author.avatarURL({ dynamic: true }), 'https://teleg.run/satont')
      .setDescription(this.description)
      .addField('Uptime', this.client.uptime, true)
      .addField('Users', this.client.users.cache.size, true)
      .addField('Guilds', this.client.guilds.cache.size, true)

    return message.reply(embed)
  }
}