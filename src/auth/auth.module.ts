import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { AuthService } from 'src/auth/auth.service'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from 'src/auth/strategies/local.strategy'
import { AuthController } from 'src/auth/auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { config } from 'dotenv'
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

config()

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '15m' }
    })

  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
