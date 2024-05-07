import { BaseEntity } from 'src/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({unique: true,name:'role_name'})
    roleName: string

    @Column()
    description: string

    @Column()
    permissions: string
}
