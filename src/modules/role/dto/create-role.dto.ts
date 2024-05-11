import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'role name' })
  roleName: string

  @ApiProperty({ required: false })
  descriptions: string

  permissionIds: string[]

    
  menuIds: string[]
}
