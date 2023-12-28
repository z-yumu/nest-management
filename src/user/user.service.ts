import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Like, Repository } from 'typeorm'
import { Pagination } from 'src/common/dto'

type QueryType = CreateUserDto & Pagination
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const data = new User()
    data.nickName = createUserDto.nickName
    data.password = createUserDto.password
    data.account = createUserDto.account
    return this.user.save(data)
  }

  async findAll() {
    // query: QueryType
    // const data = await this.user.find({
    //   where: {
    //     nickName: Like(`%${query.nickName}%`),
    //   },
    //   order: {
    //     id: 'DESC',
    //   },
    //   skip: (query.page - 1) * query.pageSize,
    //   take: query.pageSize
    // })
    // return {
    //   data
    // }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
