import { Controller, Post, Req, UseGuards } from '@nestjs/common'

import { AuthService } from 'src/auth/auth.service'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { Public } from 'src/common/decorators/Public'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user)
  }
}
