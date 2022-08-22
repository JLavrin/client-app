import { Controller, Post, Req, Res } from '@nestjs/common'
import { ClientCreateResponse } from 'src/client/client.types'
import { Request, Response } from 'express'

@Controller('/client')
export class ClientController {
  @Post()
  createClient(@Req() req: Request, @Res() res: Response): ClientCreateResponse {
    return {
      id: req.body.id,
      status: Number(res.status)
    }
  }
}
