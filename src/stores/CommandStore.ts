import MarmokBot from '../client/marmokbot'
import { resolve } from 'path'
import { readdirSync } from 'fs'
import { Command } from '../typings/commands'
import getFiles from '../helpers/getFiles'

export default class CommandStore {
  client: MarmokBot

  constructor(client: MarmokBot) {
    this.client = client
  }

  async loadCommands() {
    const commandFiles: string[] = []
    for await (const file of getFiles(resolve(__dirname, '..', 'commands'))) commandFiles.push(file)

    for (const file of commandFiles) {
      const command: Command = new((await import(resolve(__dirname, '..', 'commands', file))).default)(this.client)

      if (typeof command.init === 'function') {
        await command.init()
      }

      this.client.commands.set(command.name, command)
    }
    console.log(commandFiles.length + ' commands was loaded.')
    console.log(this.client.commands)
  }
}