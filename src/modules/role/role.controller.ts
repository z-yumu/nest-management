import { Controller, Post, Body } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { ApiTags } from '@nestjs/swagger'

// only admin could add/del role
@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('addRole')
  addRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.addRoleServ(createRoleDto)
  }

  @Post('delRole')
  delRole() {
    return this.roleService.delRoleServ([1])
  }
}
