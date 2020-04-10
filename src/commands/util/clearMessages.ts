import { Command } from "../../typings/discordjs";
import { Message } from "discord.js";

export default class Clear implements Command {
  name = 'clear'
  category = 'util'
  description = 'Deletes N old messages. 🗑️'

  async run(message: Message, args) {
    return message.reply('qwe')
  }
}