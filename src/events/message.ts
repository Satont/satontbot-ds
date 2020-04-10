import { Event } from '../typings/discordjs'
import MarmokBot from '../client/marmokbot'
import { Message } from 'discord.js'
import CommandHandler from '../struct/CommandHandler'
import { User } from '../models/User'

export default class Ready implements Event {
  name = 'message'
  client: MarmokBot
  commandHandler: CommandHandler

  constructor(client: MarmokBot) {
    this.client = client
    this.commandHandler = new CommandHandler(this.client)
  }

  async run(message: Message) {
    await this.findOrUpdateUser(message)
    await this.commandHandler.process(message)
  }

  async findOrUpdateUser(message: Message) {
    const [user] = await User.findOrCreate({
      where: { guildId: message.guild.id, userId: message.member.id },
      defaults: { guildId: message.guild.id, userId: message.member.id, username: message.author.username }
    })

    message.member.db = user
  }
}
