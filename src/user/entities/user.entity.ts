import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
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
