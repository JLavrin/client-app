import { Injectable } from '@nestjs/common'
import { Pool } from 'pg'
import { config } from 'dotenv'

import { ConnectionStatus } from 'src/db/db.types'

config()
@Injectable()

export class DBService {
  getDBConnectionStatus(): ConnectionStatus {
    return {
      status: 'Pass'
    }
  }

  private getDBPool() {
    config()
    return new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT, 10),
      ssl: { rejectUnauthorized: false }
    })
  }

  async isReady() {
    try {
      await this.getDBPool().query('SELECT 1')
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  async query(query: string) {
    try {
      const response = await this.getDBPool().query(query)

      return response.rows
    } catch (err) {
      return err || null
    }
  }
}
