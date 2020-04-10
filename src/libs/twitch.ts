import axios, { AxiosInstance } from 'axios'

class Twitch {
  private clientId: string
  public kraken: AxiosInstance
  public helix: AxiosInstance

  constructor(clientId: string) {
    this.clientId = clientId

    const instance = axios.create({})
    instance.defaults.headers['Client-ID'] = clientId

    this.helix = instance
    this.helix.defaults.baseURL = 'https://api.twitch.tv/helix/'
    this.helix.interceptors.response.use(r => r.data.data)

    this.kraken = instance
    this.kraken.defaults.baseURL = 'https://api.twitch.tv/kraken/'
    this.kraken.interceptors.response.use(r => r.data)
  }
}

export default new Twitch(process.env.TWITCH_CLIENTID)
