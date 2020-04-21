import { Event } from '../typings/discordjs'
import SatontBot from '../client/satontbot'
import { Message } from 'discord.js'
import CommandHandler from '../struct/CommandHandler'

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default class Ready implements Event {
  name = 'message'
  client: SatontBot
  commandHandler: CommandHandler

  constructor(client: SatontBot) {
    this.client = client
    this.commandHandler = new CommandHandler(this.client)
  }

  async run(message: Message) {
    if (message.author.id === this.client.user.id) return // ignore self bot messages

    const prefixRegex = new RegExp(`^(<@!?${this.client.user.id}>|${escapeRegex(message.guild.settings.prefix)})\\s*`)
    const matchedPrefix = message.content.match(prefixRegex)

    if (matchedPrefix) {
      const args = message.content.slice(matchedPrefix[1].length).trim().split(/ +/)

      return await this.commandHandler.process(message, args)
    }

    const dbUser = await message.member.fetchDbData()
    await dbUser.increment({ messages: 1 })
  }
}
