import MarmokBot from "../client/marmokbot";

export default class Prefix {
  client: MarmokBot
  constructor(client) {
    this.client = client
  }

  async init() {
    this.client.guilds.cache.each(async (guild) => {
      guild.settings.prefix = '!'
    })
  }
}