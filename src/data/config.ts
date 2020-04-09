export default {
  DISCORD: {
    token: process.env.DISCORD_TOKEN
  },
  DB: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  PORT: process.env.PORT
}