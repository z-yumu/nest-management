import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

// PartialType 是一个函数，它接受一个 TypeScript 类型作为参数，并返回该类型的所有属性都设为可选的新类型。
export class UpdateUserDto extends PartialType(CreateUserDto) {}
