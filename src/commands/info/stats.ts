import { Command } from "../../typings/discordjs";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import SatontBot from "../../client/satontbot";
import humanize from 'humanize-duration'

export default class Test implements Command {
  client: SatontBot
  name = 'stats'
  description = 'Print bot usage statistic 🤖'
  category = 'info'
  aliases = ['statistic']
  
  constructor(client) {
    this.client = client
  }

  async run(message: Message) {
    const author = await this.client.users.fetch('266632783336570880')
    const uptime = humanize(this.client.uptime, { units: ['d', 'h', 'm', 's'], round: true, largest: 2 })
    const memory = process.memoryUsage().heapUsed / 1024 / 1024
    const embed = new MessageEmbed()
      .setThumbnail(this.client.user.avatarURL())
      .setColor('03fcdf')
      .setTitle('Bot stats')
      .setDescription(this.description)
      .setFooter('Made by Satont', author.avatarURL({ dynamic: true }))
      .addField('Uptime', uptime, true)
      .addField('Users', this.client.users.cache.size, true)
      .addField('Guilds', this.client.guilds.cache.size, true)
      .addField('Mem used', `${memory.toFixed()}MB`, true)

    return message.reply(embed)
  }
}