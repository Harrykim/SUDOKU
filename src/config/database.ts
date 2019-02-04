require('dotenv').config()
interface ConnectionConfig {
  host: string
  user: string
  password: string
  database: string
  charset: string

  typeCast: (field: any, next: () => void) => void
}

interface DatabaseConfig {
  client: string
  connection: ConnectionConfig
}

const config: DatabaseConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    charset: 'utf8',
    typeCast: (field: any, next: () => void) => {
      if (field.type === 'TINY' && field.length === 1) {
        const value = field.string()
        return value ? (value === '1') : null
      }
      return next()
    }
  }
}

export default config
