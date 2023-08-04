import * as dotenv from 'dotenv'

dotenv.config()

const config = {
  BEMFA_CLIENT_ID: process.env.BEMFA_CLIENT_ID
}

export default config
