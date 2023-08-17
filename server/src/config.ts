import * as dotenv from 'dotenv'

dotenv.config()

const config = {
  BEMFA_CLIENT_ID: process.env.BEMFA_CLIENT_ID,
  SERVER_PORT: process.env.SERVER_PORT
}

export default config
