import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
// SetMetadata是一个装饰器函数，它接收两个参数：第一个参数是键，第二个参数是值。
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
