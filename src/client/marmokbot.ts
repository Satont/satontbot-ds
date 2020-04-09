import { Client } from 'discord.js'
import config from '../data/config'
import { Collection } from 'discord.js'
import { Event } from '../typings/events'
import { Command } from '../typings/commands'

import CommandStore from '../stores/Commands'
import EventStore from '../stores/Events'
import SettingsStore from '../stores/Settings'

export default class MarmokBot extends Client {
  public connected: boolean = false
  public events: Collection<string, Event> = new Collection()
  public commands: Collection<string, Command> = new Collection()

  constructor() {
    super()
    this.init()
  }
  async init() {
    await this.login(config.DISCORD.token)
    this.on('ready', async () => {
      await new EventStore(this).load()
      await new CommandStore(this).load()
      await new SettingsStore(this).load()
    })
    this.user.setStatus('dnd')
    this.user.setActivity({ type: 'WATCHING', name: `${this.users.cache.size} users` })
  }
}

