import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert } from 'typeorm'
import { BaseEntity } from 'src/entities/base.entity'
import * as bcrypt from 'bcrypt'
@Entity()
export class User extends BaseEntity  {
  //自增列
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  account: string

  @Column({unique: true})
  nickName: string
  
  // 不返回password
  @Column({select: false})
  password: string

  @BeforeInsert()
  async hashPassword() {
    // 这里的10是加密强度
    if(this.password) this.password = bcrypt.hashSync(this.password, 10)
  }

}
