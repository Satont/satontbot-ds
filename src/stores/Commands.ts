import MarmokBot from '../client/marmokbot'
import { resolve } from 'path'
import getFiles from '../helpers/getFiles'
import { Command } from '../typings/discordjs';
import { Alias } from '../models/Alias'

export default class CommandStore {
  client: MarmokBot

  constructor(client: MarmokBot) {
    this.client = client
    this.setStore()
  }
  private setStore() {
    this.client.stores.commands = this
  }
  async load() {
    const commandFiles: string[] = []
    for await (const file of getFiles(resolve(__dirname, '..', 'commands'))) commandFiles.push(file)

    for (const file of commandFiles) {
      const command: Command = new((await import(resolve(__dirname, '..', 'commands', file))).default)(this.client)

      if (typeof command.init === 'function') {
        await command.init()
      }
      const dbAliases: string[] = (await Alias.findAll({ where: { command: command.name }})).map((alias: Alias) => alias.name)
      if (!command.aliases || !command.aliases.length) command.aliases = []
      else if (dbAliases.length) command.aliases = [...command.aliases, ...dbAliases].filter((v, i, a) => a.indexOf(v) === i)

      this.client.commands.set(command.name, command)
    }
    console.log(commandFiles.length + ' commands was loaded.')
  }

  async addAlias(commandName: string, alias: string) {
    commandName = commandName.toLocaleLowerCase()
    alias = alias.toLocaleLowerCase()
    const command = this.client.commands.get(commandName)
    
    if (!command) throw new Error('Command not found')

    await Alias.create({
      command: command.name,
      name: alias,
    })

    command.aliases.push(alias)
  }

  async removeAlias(aliasName: string) {
    aliasName = aliasName.toLocaleLowerCase()
    const command = this.client.commands.find(c => c.aliases.includes(aliasName))
    
    if (!command) throw new Error('Command not found')

    const alias: Alias = await Alias.findOne({ where: { name: aliasName }})

    if (alias) {
      await alias.destroy()
      const index = command.aliases.indexOf(aliasName)
      command.aliases.splice(index, 1)
    }
  }
}
