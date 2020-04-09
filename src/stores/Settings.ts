import MarmokBot from '../client/marmokbot'
import { resolve } from 'path'
import { Command } from '../typings/commands'
import getFiles from '../helpers/getFiles'
import { Guild } from '../models/Guild'
import { Structures } from 'discord.js'

export default class Settings {
  client: MarmokBot

  constructor(client: MarmokBot) {
    this.client = client
  }

  async load() {
    await this.init()
    const settingsFiles: string[] = []
    for await (const file of getFiles(resolve(__dirname, '..', 'settings'))) settingsFiles.push(file)

    for (const file of settingsFiles) {
      const command: Command = new((await import(resolve(__dirname, '..', 'settings', file))).default)(this.client)

      if (typeof command.init === 'function') {
        await command.init()
      }
    }
    console.log(settingsFiles.length + ' settings was loaded.')
  }

  async init() {
    return await Promise.all([
      this.client.guilds.cache.each(async (guild) => {
        const [created, isNew]: [Guild, boolean] = await Guild.findOrCreate({
          where: { guildId: guild.id },
          defaults: { guildId: guild.id, name: guild.name }
        })
        
        if (!isNew) await created.update({ name: guild.name })
  
        this.client.guilds
        guild.settings = {}
        return true
      })
    ])
  }
}
