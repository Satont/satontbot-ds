import 'reflect-metadata'
import 'source-map-support/register'
require('dotenv').config()

import { connected as DBConnected } from './libs/db'
import SatontBot from './client/satontbot'
let bot: SatontBot
import logs from 'discord-logs'

const start = async () => {
  if (!DBConnected) return setTimeout(() => start(), 500)
  bot = new SatontBot()
  await logs(bot)
}
start()

process.on('exit', () => {
  bot?.destroy()
})
