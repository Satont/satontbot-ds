import { Client as KlasaClient } from 'klasa'

class MarmokBot extends KlasaClient {
  public connected: boolean = false

  constructor() {
    super({
      prefix: '!',
      typing: true,
      ownerID: '266632783336570880',
    })
    this.login('NTY4MzY2MDYxNDMxMjkxOTE0.XkGzaw.-OxdZ2XFnlfrq48kD3KeKPLP4ls')
  }
}

export default new MarmokBot()
