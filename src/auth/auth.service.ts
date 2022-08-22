import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser(username, false)
    if (user && typeof user !== 'string' && user.password === password) {
      const { user_id, username: usernameResponse, email, role_name } = user
      return { user_id, username: usernameResponse, email, role_name }
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
