import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
})
export class UserModule {}
