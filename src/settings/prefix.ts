import MarmokBot from "../client/marmokbot";
import { Guild } from '../models/Guild'
import { Guild as DJSGuild } from 'discord.js'

export default class Prefix {
  client: MarmokBot
  constructor(client) {
    this.client = client
  }

  async init() {
    const guilds: Guild[] = await Guild.findAll()

    this.client.guilds.cache.each(async (guild) => {
      guild.settings.prefix = guilds.find(g => g.guildId === guild.id).prefix || '!'
    })
  }

  async update(guild: DJSGuild, prefix: string) {
    if (!prefix.length) throw new Error('Prefix cannot be empty')
    guild.settings.prefix = prefix
    await Guild.findOne({ where: { 
      guildId: guild.id
    }}).then((g: Guild) => {
      g.update({ prefix })
    })
  }
}