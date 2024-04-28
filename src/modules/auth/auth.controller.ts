import { Controller, Post, UseGuards, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './dto/update-auth.dto'


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'token test' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.loginService(loginDto)
  }
}
