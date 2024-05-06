import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Like, Repository } from 'typeorm'
import { Pagination } from 'src/common/dto'
import { isEmpty } from 'lodash'
import { ApiException } from 'src/common/exceptions/api.exception'

// 搜索时候都变成可选
export type QueryType = Partial<CreateUserDto> & Pagination
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}
  async create(createUserData: CreateUserDto) {
    // 看用户账号是否已存在
    const { nickName, password, account } = createUserData
    const arr = await this.user.find({
      where: {
        account
      },
    })

    if(!isEmpty(arr)) throw new ApiException(10004)
    const data = new User()
    data.nickName = nickName
    data.password = password
    data.account = account
    return this.user.save(data)
  }

  async findAll(query: QueryType) {
    // console.log(query,'query')
    const data = await this.user.find({
      where: {
        // nickName: Like(`%${query.nickName}%`),
        account:Like(`%${query.account}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    })
    return {
      data,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    
  }

}
