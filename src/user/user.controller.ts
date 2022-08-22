import {
  Body,
  Controller, Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Request, Response } from 'express'

import { UserService } from 'src/user/user.service'
import { CreateUserDto } from 'src/user/user.create.dto'

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  getMe(@Req() req: Request) {
    return this.userService.getMe(req.headers.authorization)
  }

  @Get('/:userId')
  async getUser(@Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.userService.getUser(Number(req.params.userId))

      if (user) {
        res.send(user)
      } else {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      }
    } catch (err) {
      throw new HttpException(err.message, err.status)
    }
  }

  @Get('/')
  async getUserList(@Req() req: Request, @Res() res: Response) {
    const limit = !isNaN(Number(req.query.limit)) ? req.query.limit : 10;

    try {
      const userList = await this.userService.getUserList(Number(limit))

      if (userList) {
        res.send(userList)
      } else {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      }
    } catch (err) {
      throw new HttpException(err.message, err.status)
    }
  }

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const response = await this.userService.createUser(createUserDto)
      res.statusCode = response.statusCode
      res.send(response)
    } catch (err) {
      throw new HttpException('Internal server error', 500)
    }
  }

  @Put('/')
  async updateUser(@Req() req: Request, @Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const response = await this.userService.updateUser(Number(req.query.id), createUserDto)
      res.send(response)
    } catch (err) {
      throw new HttpException('Internal server error', 500)
    }
  }

  @Delete('/')
  async deleteUser(@Req() req: Request, @Res() res: Response) {
    try {
      const response = await this.userService.deleteUser(Number(req.query.id), Number(req.query.operator_role_id))
      res.send(response)
    } catch (err) {
      throw new HttpException('Internal server error', 500)
    }
  }
}
