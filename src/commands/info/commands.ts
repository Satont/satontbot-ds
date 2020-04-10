import { Command } from "../../typings/discordjs";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import MarmokBot from "../../client/marmokbot";

export default class Test implements Command {
  client: MarmokBot
  name = 'commands'
  description = 'Print bot command list.'
  aliases = ['cmds', 'help']
  
  constructor(client) {
    this.client = client
  }

  async run(message: Message) {
    const categories: { [x: string]: Command[] } = {
      ...this.formCategories(),
      main: []
    }
    
    for (const [, command] of this.client.commands) {
      if (command.category) {
        categories[command.category].push(command)
      } else {
        categories['main'].push(command)
      }
    }
    for (const [name, commands] of Object.entries(categories).filter(([name]) => name !== 'undefined')) {
      if (name === 'main') {
        const list = commands.map(c => `${message.guild.settings.prefix + c.name} ${c.aliases.length ? `(${c.aliases.join(',')})` : ''} ${c.description ? '— ' + c.description : ''}`)
        const embed = new MessageEmbed()
          .setTitle('Main commands')
          .setDescription(`That means command have no category. \n
            • ${list.join('\n • ')}
          `)

        message.channel.send(embed)
      } else {
        const list = commands.map(c => `${message.guild.settings.prefix}${c.category} ${c.name} ${c.aliases.length ? `(${c.aliases.join(',')})` : ''} ${c.description ? '— ' + c.description : ''}`)
        const embed = new MessageEmbed()
          .setTitle(name.charAt(0).toLocaleUpperCase() + name.substring(1))
          .setDescription(`• ${list.join('\n • ')}`)
        message.channel.send(embed)
      }
    }
  }

  formCategories(): { [x: string]: Command[] } {
    const categories = {}
    for (const category of this.client.commands.map(c => c.category)) categories[category] = []

    return categories
  }
}