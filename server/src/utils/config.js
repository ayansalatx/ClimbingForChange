import { config as loadEnv } from 'dotenv'
import path from 'path'

const envFileToLoad = process.env.NODE_ENV === 'development' ? '.env.production.local' : '.env.test.local'

loadEnv({
  path: path.resolve(process.cwd(), envFileToLoad),
})

const config = {
  PORT: process.env.PORT,
  MONGO_URI_BASE: process.env.MONGO_URI_BASE,
}

export default config
