import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateAuthDto } from './create-auth.dto'
import { IsString,IsNotEmpty  } from 'class-validator'

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:'user account',required:true})
    account: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:'user password',required:true})
    password: string
}
