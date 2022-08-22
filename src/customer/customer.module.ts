import { Module } from '@nestjs/common'
import { DbModule } from 'src/db/db.module'
import { CustomerService } from 'src/customer/customer.service'
import { CustomerController } from 'src/customer/customer.controller'

@Module({
  imports: [DbModule],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
