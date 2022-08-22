import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common'
import { CustomerService } from 'src/customer/customer.service'
import { Request, Response } from 'express'

import { CustomerCreateDto } from 'src/customer/customer.create.dto'

@Controller('/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/')
  async getCustomer(@Req() req: Request, @Res() res: Response) {
    try {
      const customer = await this.customerService.getCustomers()

      if (customer) {
        res.send(customer)
      } else {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      }
    } catch (err) {
      throw new HttpException(err.message, err.status)
    }
  }

  @Get('/:customer')
  async getCustomerById(@Req() req: Request, @Res() res: Response) {
    try {
      const customer = await this.customerService.getCustomer(Number(req.params.customer))

      if (customer) {
        res.send(customer)
      } else {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      }
    } catch (err) {
      throw new HttpException(err.message, err.status)
    }
  }

  @Post('/')
  async addCustomer(@Body() createCustomerDto: CustomerCreateDto, @Res() res: Response) {
    try {
      const response = await this.customerService.createCustomer(createCustomerDto)
      res.statusCode = response.statusCode
      res.send(response)
    } catch (err) {
      throw new HttpException('Internal server error', 500)
    }
  }

  @Put('/:customer')
  async updateCustomer(@Req() req: Request, @Body() createCustomerDto: CustomerCreateDto, @Res() res: Response) {
    try {
      const response = await this.customerService.updateCustomer(Number(req.params.customer), createCustomerDto)
      res.statusCode = response.statusCode
      res.send(response)
    } catch (err) {
      throw new HttpException('Internal server error', 500)
    }
  }

  @Delete('/:customer')
  async deleteCustomer(@Req() req: Request, @Res() res: Response) {
    try {
      const response = await this.customerService.deleteCustomer(Number(req.params.customer))
      res.statusCode = response.statusCode
      res.send(response)
    } catch (err) {
      throw new HttpException('Internal server error', 500)
    }
  }
}
