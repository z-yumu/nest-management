import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(private jwtServiec: JwtService) {}
  loginService(user: Partial<User>) {
    const payload = { nickName: user.nickName, password: user.password }
    const access_token = this.jwtServiec.sign(payload)

    return {
      access_token,
      // Bearer是JWT标准中的一种认证方式，它允许将JWT嵌入到HTTP请求的Authorization头部中。
      type: 'Bearer',
    }
  }
}
