import { Module } from '@nestjs/common'

import { AppController } from 'src/app/app.controller'
import { AppService } from 'src/app/app.service'
import { ClientModule } from 'src/client/client.module'
import { DbModule } from 'src/db/db.module'
import { UserModule } from 'src/user/user.module'
import { AuthModule } from 'src/auth/auth.module'
import { CustomerModule } from 'src/customer/customer.module'

@Module({
  imports: [
    ClientModule,
    DbModule,
    UserModule,
    AuthModule,
    CustomerModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule {}
