import { Module } from '@nestjs/common'
import { ClientController } from 'src/client/client.controller'

@Module({
  imports: [],
  controllers: [ClientController],
  providers: []
})
export class ClientModule {}
