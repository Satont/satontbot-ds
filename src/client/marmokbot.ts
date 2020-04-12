import { resolve } from 'path'
import { readdirSync } from 'fs'

// extends should be readed before other staff
const extendsPath = resolve(__dirname, '..', 'extends')
const extendsList = readdirSync(extendsPath)
for (const extend of extendsList) require(`${extendsPath}/${extend}`)
//

import { Client } from 'discord.js'
import config from '../data/config'
import { Collection } from 'discord.js'

import CommandStore from '../stores/Commands'
import EventStore from '../stores/Events'
import SettingsStore from '../stores/Settings'
import { Command } from '../typings/discordjs';
import { Event } from '../typings/discordjs';

export default class MarmokBot extends Client {
  public connected: boolean = false
  public events: Collection<string, Event> = new Collection()
  public commands: Collection<string, Command> = new Collection()

  constructor() {
    super()
    this.init()
  }
  async init() {
    this.setStores()
    await this.login(config.DISCORD.token)
    this.on('ready', async () => {
      await new EventStore(this).load()
      await new CommandStore(this).load()
      await new SettingsStore(this).load()
      await this.updateActivity().then(() => this.setInterval(() => this.updateActivity(), 1 * 60 * 1000))
    })
  }
  private setStores() {
    this.stores = {} as any
  }
  async updateActivity() {
    this.user.setStatus('dnd')
    this.user.setActivity({ type: 'WATCHING', name: `${this.users.cache.size} users` })
  }
}

