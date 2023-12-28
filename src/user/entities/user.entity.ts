import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from 'src/entities/base.entity'
@Entity()
export class User extends BaseEntity  {
  //自增列
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  account: string

  @Column()
  nickName: string
  
  @Column()
  password: string

  @Column()
  phone: string
}
