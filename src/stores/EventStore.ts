import MarmokBot from '../client/marmokbot'
import { resolve } from 'path'
import { readdirSync } from 'fs'

export default class EventStore {
  client: MarmokBot
  events: Map<string, object> = new Map()

  constructor(client: MarmokBot) {
    this.client = client
  }

  async loadEvents() {
    const eventFiles = readdirSync(resolve(__dirname, '..', 'events'))

    for (const file of eventFiles) {
      const event = new((await import(resolve(__dirname, '..', 'events', file))).default)(this.client)

      if (typeof event.init === 'function') {
        await event.init()
      }

      if (event.once) {
        this.client.once(event.name, async (...args) => event.run(...args))
      } else {
        this.client.on(event.name, async (...args) => event.run(...args))
      }
      this.events.set(event.name, event)
    }
    console.log(eventFiles.length + ' events was loaded.')
  }
}