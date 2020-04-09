import MarmokBot from '../client/marmokbot'
import { resolve } from 'path'
import { Command } from '../typings/commands'
import getFiles from '../helpers/getFiles'

export default class Settings {
  client: MarmokBot

  constructor(client: MarmokBot) {
    this.client = client
  }

  async load() {
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
}