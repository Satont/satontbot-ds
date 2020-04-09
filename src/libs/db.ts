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
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  models: [join(__dirname, '../models')],
  logging: false
})

sequelize.authenticate()
  .then(() => {
    sequelize.sync().then(() => connected = true).then(() => console.info('Succesfuly connected to db.'))
  })
  .catch((err) => {
    console.log(err)
    process.exit()
  })


export { sequelize, connected }
