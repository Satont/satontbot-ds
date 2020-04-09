module.exports = {
  client: 'pg',
  connection: { 
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  migrations: {
    extension: 'ts',
    directory: 'src/data/migrations',
    tableName: 'migrations',
    schemaName: 'public'
  }
}