import { Controller, Post, Body, Param } from '@nestjs/common'
import { QueryType, UserService } from './user.service'
import { CreateUserDto, QueryDelUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
// UsePipes是类转换
import { ParseIntPipe } from '@nestjs/common'
// 全都用post吧

@Controller('user')
@ApiTags('user') // ApiTags整个模块的说明
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('addUser')
  @ApiOperation({ summary: 'add user', description: 'add user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Post('queryUserList')
  @ApiOperation({ summary: 'find all user' })
  findAll(@Body() body: QueryType) {
    return this.userService.findAll(body)
  }

  @Post('findOneUser')
  @ApiOperation({ summary: 'find one user' })
  findOne(@Body() body: QueryDelUserDto) {
    const { id } = body
    return this.userService.findOne(+id)
  }

  @Post('updateUser')
  @ApiOperation({ summary: 'update user', description: 'update user' })
  update(@Body() id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Post('delUser')
  @ApiOperation({ summary: 'del user' })
  remove(@Body() body: QueryDelUserDto) {
    const { id } = body
    return this.userService.remove(+id)
  }
}
