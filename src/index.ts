import 'reflect-metadata'
import 'source-map-support/register'

import MarmokBot from './bot/klasa'

const start = () => {
  if (!MarmokBot.connected) return setTimeout(start, 500)
  console.info('Application is ready.')
}
start()
