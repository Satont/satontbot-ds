import { Structures } from 'discord.js'
import { User } from '../models/User'

Structures.extend('GuildMember', GuildMember => {
  class GuildMemberWithDbMethod extends GuildMember {
    constructor(client, data, guild) {
      super(client, data, guild)
    }

    async fetchDbData(): Promise<User> {
      const user = await User.findOne({ where: { 
        userId: this.id
      }})
      return user || await User.create({ userId: this.id, guildId: this.guild.id })
    }
  }

  return GuildMemberWithDbMethod
})
