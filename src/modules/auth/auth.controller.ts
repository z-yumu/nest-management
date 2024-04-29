import { Controller, Post, UseGuards, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './dto/update-auth.dto'
import { Public } from 'src/common/decorators/public.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'token test' })
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.loginService(loginDto)
  }
}
