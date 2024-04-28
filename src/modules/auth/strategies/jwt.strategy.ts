import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstant } from '../constant'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({})
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }
  }
}
