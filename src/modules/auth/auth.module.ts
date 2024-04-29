import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET') ?? 'secret',
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRES_IN') ?? '4h',
    },
  }),

  // secret: jwtConstant.secret,
  // signOptions: { expiresIn: '4h' },
})

@Module({
  imports: [TypeOrmModule.forFeature([User]), jwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [jwtModule],
})
export class AuthModule {}
