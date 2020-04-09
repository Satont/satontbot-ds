import MarmokBot from '../client/marmokbot'
import { resolve } from 'path'
import getFiles from '../helpers/getFiles'
import { Guild } from '../models/Guild'
import { Command } from '../typings/discordjs';

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
    for await (const [, guild] of this.client.guilds.cache) {
      guild.settings = {}
      try {
        const [created, isNew]: [Guild, boolean] = await Guild.findOrCreate({
          where: { guildId: guild.id },
          defaults: { guildId: guild.id, name: guild.name },
        })

        if (!isNew) await created.update({ name: guild.name })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
