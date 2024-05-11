import { BaseEntity } from 'src/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  role_id: number

  @Column({ unique: true, name: 'role_name' })
  roleName: string

  @Column()
  description: string

  @Column()
  permissions: string

  @Column()
  state: number

  @Column()
  create_by: string
}
