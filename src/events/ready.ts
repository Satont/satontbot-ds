import { Event } from '../typings/discordjs'
import MarmokBot from '../client/marmokbot'

export default class Ready implements Event {
  once = true
  name = 'ready'
  client: MarmokBot

  constructor(client: MarmokBot) {
    this.client = client
  }

  run() {
    this.client.connected = true
    console.log('bot ready')
  }
}
