import MarmokBot from "../client/marmokbot";
import { Guild } from '../models/Guild'

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
}