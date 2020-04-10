import { Command } from "../../typings/discordjs";
import { Message, MessageEmbed } from "discord.js";

export default class Clear implements Command {
  name = 'clear'
  category = 'util'
  description = 'Deletes N old messages. 🗑️'

  async run(message: Message, args) {
    const count = parseInt(args[0])
    if (isNaN(count)) return
    const result = await message.channel.bulkDelete(count, true)

    const embed = new MessageEmbed()
      .setColor('03fcdf')
      .setDescription(`${result.size} messages was deleted.\nIf that count is unexcepted for you, then you need to know: i can't delete messages older then 2 weeks.`)

    return message.author.send(embed)
  }
}