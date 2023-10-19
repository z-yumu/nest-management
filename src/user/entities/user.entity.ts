import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  //自增列
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
  
  @Column()
  password: string
}
