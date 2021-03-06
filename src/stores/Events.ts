import SatontBot from '../client/satontbot'
import { resolve } from 'path'
import { readdirSync } from 'fs'
import { Event } from '../typings/discordjs';

export default class EventStore {
  client: SatontBot

  constructor(client: SatontBot) {
    this.client = client
    this.setStore()
  }
  private setStore() {
    this.client.stores.events = this
  }
  async load() {
    const eventFiles = readdirSync(resolve(__dirname, '..', 'events'))

    for (const file of eventFiles) {
      const event: Event = new((await import(resolve(__dirname, '..', 'events', file))).default)(this.client)

      if (typeof event.init === 'function') {
        await event.init()
      }

      if (event.once) {
        this.client.once(event.name as any, async (...args) => event.run(...args))
      } else {
        this.client.on(event.name as any, async (...args) => event.run(...args))
      }
      this.client.events.set(event.name, event)
    }
    console.log(eventFiles.length + ' events was loaded.')
  }
}
