import { Event } from '../typings/discordjs'
import SatontBot from '../client/satontbot'

export default class Ready implements Event {
  once = true
  name = 'ready'
  client: SatontBot

  constructor(client: SatontBot) {
    this.client = client
  }

  run() {
    this.client.connected = true
    console.log('bot ready')
  }
}
