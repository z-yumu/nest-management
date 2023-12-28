import { ApiProperty } from '@nestjs/swagger'

import { IsString,IsNotEmpty } from 'class-validator'

/**
 * 为什么不直接使用实体类型user.entiry，而是又定义一个 CreateUserDto
 * 因为HTTP请求传参和返回的内容可以采用和数据库中保存的内容不同的格式
 * 所以将它们分开可以随着时间的推移及业务变更带来更大的灵活性，这里涉及到单一设计的原则，因为每一个类应该处理一件事，最好只处理一件事。
 **/
export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'user account', required: false })
    account: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:'user nickName',required:true})
    nickName:string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:'user pwd',required:true})
    password:string

}



