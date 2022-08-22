import { Module } from '@nestjs/common'
import { DbModule } from 'src/db/db.module'
import { UserService } from 'src/user/user.service'
import { UserController } from 'src/user/user.controller'

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})

export class UserModule {}
