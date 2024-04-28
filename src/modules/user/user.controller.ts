import { Controller, Post, Body, Param, Res, Req, UseGuards } from '@nestjs/common'
import { QueryType, UserService } from './user.service'
import { CreateUserDto, QueryDelUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
// UsePipes是类转换
import { ParseIntPipe } from '@nestjs/common'
import * as svgCaptcha from 'svg-captcha'
import { AuthGuard } from '@nestjs/passport'
// 全都用post吧

@Controller('user')
@ApiTags('user') // ApiTags整个模块的说明
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('code')
  @ApiOperation({ summary: 'create code' })
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    })
    console.log(captcha,'captcha')
    req.session.code = captcha.text //存储验证码记录到session
    return 'gg'
    // res.type('image/svg+xml')
    // res.send(captcha.data)
  }

  @Post('checkCode')
  @ApiOperation({ summary: 'checkCode', description: 'checkCode' })
  createUser(@Req() req, @Body() body) {
    console.log(req.session.code, body)
    if (
      req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()
    ) {
      return {
        message: '验证码正确',
      }
    } else {
      return {
        message: '验证码错误',
      }
    }
  }

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

  @UseGuards(AuthGuard('jwt'))
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
