import { Client } from 'discord.js'
import EventStore from '../stores/EventStore'
import config from '../data/config'

export default class MarmokBot extends Client {
  public connected: boolean = false

  constructor() {
    super()
    this.init()
  }
  async init() {
    await this.login(config.DISCORD.token)
    this.on('ready', async () => {
      await new EventStore(this).loadEvents()
    })
    this.user.setStatus('dnd')
    this.user.setActivity({ type: 'WATCHING', name: `${this.users.cache.size} users` })
  }
}

