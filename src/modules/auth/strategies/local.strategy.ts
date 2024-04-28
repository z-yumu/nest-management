import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import type { IStrategyOptions } from 'passport-local'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BadRequestException } from '@nestjs/common'
import { User } from '../../user/entities/user.entity'
import { compareSync } from 'bcrypt'

export class LocalStrategy extends PassportStrategy(Strategy) {
  // 此处的 Strategy 要引入 passport-local 中的
  constructor(
    // Repository 是 typeorm 中的，用来操作数据库的
    @InjectRepository(User) private readonly userRepository: Repository<User>, // 将 user 实体注入进来
  ) {
    super({
      usernameField: 'nickName', // 固定写法，指定用户名字段，可以为 phone 或 email 等其他字段，不影响
      passwordField: 'password', // 固定写法，指定密码字段
    } as IStrategyOptions)
  }

  async validate(nickName: string, password: string): Promise<any> {
    // 必须实现一个 validate 方法
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.nickName=:nickName', { nickName })
      .getOne()

    if (!user) throw new BadRequestException('用户不存在')

    if (!compareSync(password, user.password))
      throw new BadRequestException('密码错误')

    return user
  }
}
