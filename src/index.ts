import 'reflect-metadata'
import 'source-map-support/register'
require('dotenv').config()

import { connected as DBConnected } from './libs/db'
import MarmokBot from './client/marmokbot'
let bot: MarmokBot

const start = () => {
  if (!DBConnected) return setTimeout(() => start(), 500)
  bot = new MarmokBot()
}
start()

process.on('exit', () => {
  bot?.destroy()
})
