import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtModule } from '@nestjs/jwt'

const jwtModule = JwtModule.register({
  secret: 'secret', 
  signOptions: { expiresIn: '4h' }, 

  
})

@Module({
  imports: [TypeOrmModule.forFeature([User]),jwtModule],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy],
  exports:[jwtModule]
})

export class AuthModule {}
