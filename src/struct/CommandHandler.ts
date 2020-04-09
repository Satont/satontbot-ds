import MarmokBot from "../client/marmokbot";
import { Message } from "discord.js";

export default class CommandHandler {
  client: MarmokBot

  constructor(client) {
    this.client = client
  }

  async process(message: Message) {
    const command = this.client.commands.get(message.content)
    if (command) await command.run(message)
  }
}