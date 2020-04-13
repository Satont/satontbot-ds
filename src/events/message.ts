import { Event } from '../typings/discordjs'
import SatontBot from '../client/satontbot'
import { Message } from 'discord.js'
import CommandHandler from '../struct/CommandHandler'
import { User } from '../models/User'

export default class Ready implements Event {
  name = 'message'
  client: SatontBot
  commandHandler: CommandHandler

  constructor(client: SatontBot) {
    this.client = client
    this.commandHandler = new CommandHandler(this.client)
  }

  async run(message: Message) {
    await this.commandHandler.process(message)
  }
}
