import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from 'src/entities/base.entity'

@Entity()
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn()
    menu_id:number
    
    @Column()
    parent_menu_id:number
    
    @Column()
    menu_name:string
    
    @Column()
    menu_url:string
    
    @Column()
    icon:string
    
    @Column()
    is_visible:boolean

    @Column()
    sort_order:number

    @Column()
    permission_id:string
        
    
}
