import { Sequelize } from 'sequelize-typescript'
import { join } from 'path'
import config from '../data/config'

let connected: boolean = false

const sequelize = new Sequelize(config.DB.name, config.DB.username, config.DB.password, {
  host: config.DB.host,
  port: config.DB.port,
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 1,
    acquire: 3000,
    idle: 1000
  },
  models: [join(__dirname, '../models')],
  logging: false
})

sequelize.authenticate()
  .then(() => {
    console.info('Succesfuly connected to db.')
    connected = true
  })
  .catch((err) => {
    console.error(err)
    console.info(`Can't connect to db. Please, check your config and error above.`)
    process.exit(1)
  })


export { sequelize, connected }
