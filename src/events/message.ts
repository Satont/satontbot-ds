import { Event } from '../typings/discordjs'
import MarmokBot from '../client/marmokbot'
import { Message } from 'discord.js'
import CommandHandler from '../struct/CommandHandler'

export default class Ready implements Event {
  name = 'message'
  client: MarmokBot
  commandHandler: CommandHandler

  constructor(client: MarmokBot) {
    this.client = client
    this.commandHandler = new CommandHandler(this.client)
  }

  async run(message: Message) {
    await this.commandHandler.process(message)
  }
}
