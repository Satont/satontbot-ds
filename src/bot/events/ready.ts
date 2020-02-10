import { Event } from 'klasa'

export default class Ready extends Event {
  constructor(client, store, file, directory) {
    super(client, store, file, directory, {
      name: 'ready',
      event: 'ready',
      once: true,
      emitter: client,
    })
  }

  run() {
    console.log('runned')
    this.client.connected = true
  }
}
