import { Event } from '../typings/discordjs'
import { GuildMember } from 'discord.js'
import SatontBot from '../client/satontbot'
import { CategoryChannel } from 'discord.js'
import { GuildChannel } from 'discord.js'

export default class VoiceStateUpdate implements Event {
  client: SatontBot
  name = 'voiceChannelJoin'
  voiceChannels: Map<string, string> = new Map()

  constructor(client: SatontBot) {
    this.client = client
  }

  async init() {
    this.voiceChannels.set('696000042556719200', '696000042556719197')
    this.delete()
    this.client.setInterval(() => this.delete(), 30 * 1000)
  }

  async run(member: GuildMember, channel: GuildChannel) {
    const storedChannel = this.voiceChannels.get(channel.id)
    if (!storedChannel) return;
    
    const channelForMember = await this.client.guilds.cache.get(member.guild.id).channels
      .create(`Channel for ${member.displayName}`, {
        type: 'voice',
        parent: storedChannel
      })

    await member.voice.setChannel(channelForMember)
    await channelForMember.overwritePermissions([
      {
        type: 'member',
        id: member.id,
        allow: "MANAGE_CHANNELS"
      }
    ])
  }

  async delete() {
    this.client.guilds.cache.each(async (guild) => {
      for (const category of this.voiceChannels.values()) {
        const parent = guild.channels.cache.get(category) as CategoryChannel
        if (!parent || parent.type !== 'category') continue
        let result = 0
        parent.children
          .filter(channel => channel.type === 'voice')
          .filter(channel => !this.voiceChannels.get(channel.id))
          .each(channel => {
            if (!channel.members.size) {
              result++
              channel.delete()
            }
          })
        if (result) console.log(`${result} channels was deleted in "${parent.name}" category.`)
      }
    })
    setTimeout(() => this.delete(), 30 * 1000)
  }
}
