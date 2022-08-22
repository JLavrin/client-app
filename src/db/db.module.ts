import { Module } from '@nestjs/common'
import { DBController } from 'src/db/db.controller'
import { DBService } from 'src/db/db.service'

@Module({
  imports: [],
  controllers: [DBController],
  providers: [DBService],
  exports: [DBService]
})
export class DbModule {}
