import { BaseEntity, Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";




@Entity()

export class Uts extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    title:string

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
}