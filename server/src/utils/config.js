import { config as loadEnv } from 'dotenv'
import path from 'path'

const envFileToLoad = process.env.NODE_ENV === 'development' ? '.env.production.local' : '.env.test.local'

loadEnv({
  path: path.resolve(process.cwd(), envFileToLoad),
})

const config = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET
}

export default config
