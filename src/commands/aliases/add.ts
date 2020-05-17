import { Command } from "../../typings/discordjs";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import SatontBot from "../../client/satontbot";

export default class AliasAdd implements Command {
  client: SatontBot
  name = 'add'
  description = 'Add alias for some command. ➕'
  category = 'alias'
  example = 'alias add cmds commands'
  args = {
    'commandName': {
      type: 'string',
      description: 'name of command'
    },
    'aliasName': {
      type: 'string',
      description: 'name of alias'
    }
  }

  constructor(client) {
    this.client = client
  }

  async run(message: Message, args: string[]) {
    if (!args[0]) throw 'You missed name of command.'
    if (!args[1]) throw 'You missed alias for ${args[0]} command.'

    const commandName = args[0].toLocaleLowerCase()
    const aliasName = args[1].toLocaleLowerCase()

    if (!commandName || !aliasName) return
    
    await this.client.stores.commands.addAlias(commandName, aliasName)

    const embed = new MessageEmbed()
      .setColor('03fcdf')
      .setDescription(`Alias "${aliasName}" for command "${commandName}" was added.`)

    return message.reply(embed)
  }
}