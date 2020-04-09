import 'reflect-metadata'
import 'source-map-support/register'
require('dotenv').config()

import MarmokBot from './client/marmokbot'
const bot = new MarmokBot()

const start = () => {
  if (!bot.connected) return setTimeout(() => start(), 500)
}
start()
