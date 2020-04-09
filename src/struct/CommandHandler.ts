import MarmokBot from "../client/marmokbot"
import { Message } from "discord.js"

export default class CommandHandler {
  client: MarmokBot

  constructor(client) {
    this.client = client
  }

  async process(msg: Message) {
    const prefix = msg.guild.settings.prefix
    if (!msg.content.startsWith(prefix)) return
    const args = msg.content.substring(prefix.length).split(/\s/)
    const commandName = args[0]

    const command = this.client.commands.get(commandName) || this.client.commands.find(c => c.aliases?.includes(commandName))
    if (command) await command.run(msg, args.slice(1))
  }
}