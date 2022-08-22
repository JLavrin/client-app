import { Body, Controller, Get } from '@nestjs/common'
import { ConnectionStatus } from 'src/db/db.types'
import { DBService } from 'src/db/db.service'

@Controller('/db')
export class DBController {
  constructor(private readonly dbService: DBService) {}

  @Get('/status')
  getDBConnectionStatus(): ConnectionStatus {
    return this.dbService.getDBConnectionStatus()
  }

  @Get('/query')
  async query(@Body() body: { query: string }) {
    return this.dbService.query(String(body.query))
  }
}
