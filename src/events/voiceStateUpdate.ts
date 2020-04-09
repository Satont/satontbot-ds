import { Event } from '../typings/events'
import { VoiceState } from 'discord.js'
import MarmokBot from '../client/marmokbot'
import { CategoryChannel } from 'discord.js'

export default class VoiceStateUpdate implements Event {
  client: MarmokBot
  name = 'voiceStateUpdate'
  voiceChannels: Map<string, string> = new Map()

  constructor(client) {
    this.client = client
  }

  async init() {
    this.voiceChannels.set('696000042556719200', '696000042556719197')
    this.delete()
    this.client.setInterval(() => this.delete(), 30 * 1000)
  }

  async run(oldState: VoiceState, newState: VoiceState) {
    await this.create(oldState, newState)
  }

  async create(oldState: VoiceState, newState: VoiceState) {
    const storedChannel = this.voiceChannels.get(newState.channelID)
    if (storedChannel) {
      const channel = await this.client.guilds.cache.get(newState.guild.id).channels
        .create(`Channel for ${newState.member.displayName}`, {
          type: 'voice',
          parent: storedChannel
        })
      await newState.setChannel(channel)
      await channel.overwritePermissions([
        {
          type: 'member',
          id: newState.member.id,
          allow: "MANAGE_CHANNELS"
        }
      ])
    }
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
