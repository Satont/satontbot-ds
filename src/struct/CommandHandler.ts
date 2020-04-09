import MarmokBot from "../client/marmokbot"
import { Message } from "discord.js"

export default class CommandHandler {
  client: MarmokBot

  constructor(client) {
    this.client = client
  }

  async process(msg: Message) {
    if (!msg.content.startsWith(msg.guild.settings.prefix)) return
    const args = msg.content.substring(1).split(/\s/)
    const commandName = args[0]
    const command = this.client.commands.get(commandName)
    if (command) await command.run(msg, args.slice(1))
  }
}