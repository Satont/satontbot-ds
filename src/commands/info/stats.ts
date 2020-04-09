import { Command } from "../../typings/commands";
import { Message } from "discord.js";

export default class Test implements Command {
  name = 'stats'

  run(message: Message) {
    return message.reply('asd')
  }
}