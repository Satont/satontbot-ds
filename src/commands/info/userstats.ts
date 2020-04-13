import { Command } from "../../typings/discordjs";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import SatontBot from "../../client/satontbot";
import humanize from 'humanize-duration'
import { User } from "../../models/User";

const shortEnglish = require('humanize-duration').humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      h: () => 'h',
    }
  },
  units: ['h'],
  spacer: '',
  maxDecimalPoints: 1,
  decimal: '.'
})

export default class UserStats implements Command {
  client: SatontBot
  name = 'me'
  description = 'Shows user statistic. 📊'
  category = 'info'
  aliases = ['userinfo']
  
  constructor(client) {
    this.client = client
  }

  async run(message: Message) {
    const accountAge = humanize(Date.now() - message.author.createdTimestamp, { units: ['y', 'd', 'h', 'm', 's'], round: true, largest: 3 })
    const joinAge = humanize(Date.now() - message.member.joinedTimestamp , { units: ['y', 'd', 'h', 'm', 's'], round: true, largest: 3 })
    const member = message.mentions.members.first() || message.member
    const dbUser = await member.fetchDbData()

    const embed = new MessageEmbed()
      .setThumbnail(member.user.avatarURL())
      .setColor(member.displayHexColor || '03fcdf')
      .setTitle(member.user.username)
      .setDescription(member.displayName || '')
      .addField('On server', joinAge, true)
      .addField('Account age', accountAge, true)
      .addField('Messages', dbUser.messages, true)
      .addField('Voice time', shortEnglish(dbUser.time * 60000), true)
      .addField('Expirience', dbUser.expirience, true)

    return message.reply(embed)
  }
}