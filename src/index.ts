import 'reflect-metadata'
import 'source-map-support/register'
require('dotenv').config()

import { connected as DBConnected } from './libs/db'
import SatontBot from './client/satontbot'
let bot: SatontBot

const start = () => {
  if (!DBConnected) return setTimeout(() => start(), 500)
  bot = new SatontBot()
}
start()

process.on('exit', () => {
  bot?.destroy()
})
