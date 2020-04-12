import { Structures } from 'discord.js'

Structures.extend('Guild', Guild => {
  class GuildExtended extends Guild {
    constructor(client, data) {
      super(client, data)
      this.settings = {}
    }
  }

  return GuildExtended
})
