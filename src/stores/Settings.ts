import SatontBot from '../client/satontbot'
import { resolve } from 'path'
import getFiles from '../helpers/getFiles'
import { Guild } from '../models/Guild'

export default class Settings {
  client: SatontBot

  constructor(client: SatontBot) {
    this.client = client
  }
  private setSettings() {
    this.client.stores.settings = {} as any
  }
  async load() {
    this.setSettings()
    await this.init()
    const settingsFiles: string[] = []
    for await (const file of getFiles(resolve(__dirname, '..', 'settings'))) settingsFiles.push(file)

    for (const file of settingsFiles) {
      const command = new((await import(resolve(__dirname, '..', 'settings', file))).default)(this.client)

      if (typeof command.init === 'function') {
        await command.init()
      }
      this.client.stores.settings[command.constructor.name.toLowerCase()] = command
    }
    console.log(settingsFiles.length + ' settings was loaded.')
  }

  async init() {
    for await (const [, guild] of this.client.guilds.cache) {
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
