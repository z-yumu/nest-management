import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstant } from '../constant'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/modules/user/entities/user.entity'
import { Repository } from 'typeorm'
import type { StrategyOptions } from 'passport-jwt'
import { LoginDto } from '../dto/update-auth.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    // jwtFromRequest是一个函数，用于从请求中提取jwt令牌。
    // ExtractJwt.fromAuthHeaderAsBearerToken()方法可以自动从headers中提取Authorization中的 token ，并且会自动去除开头的Bearer前缀
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstant.secret,
    } as StrategyOptions)
  }

  async validate(payload: LoginDto) {
    const existUser = await this.userRepository.findOne({
      where: { account: payload.account },
    })

    if (!existUser) throw new UnauthorizedException('User not found')

      return existUser
    
  }
}
