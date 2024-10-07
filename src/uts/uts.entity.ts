import { BaseEntity, Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";




@Entity()

export class Uts extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    nama:string

    @Column({unique:true})
    email:string

    @Column()
    tempat_lahir:string

    @Column()
    tanggal_lahir:Date

    @Column()
    nisn:string

    @Column()
    nik:string

    @Column()
    alamat:string

    @Column({type: 'datetime', default : () => 'CURRENT_TIMESTAMP'})
    updated_at: Date

    @Column({type: 'datetime', default : () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}