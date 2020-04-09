require('dotenv').config()

const config = {
  client: 'pg',
  connection: { 
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false,
  },
  migrations: {
    extension: 'ts',
    directory: 'src/data/migrations',
    tableName: 'migrations',
  }
}

module.exports = {
  production: config,
  development: config,
}