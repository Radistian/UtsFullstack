import { IsNotEmpty, IsOptional, IsInt, IsEmail, Length, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";



export class UtsDto{
    
    @IsOptional()
    id:number

    @IsNotEmpty({message : "Nama tidak boleh kosong"})
    nama:string

    @IsNotEmpty()
    @IsEmail({}, {message:'Format email salah, harap masukkan email yang valid'})
    email:string

    @IsNotEmpty({message : 'Tempat lahir tidak boleh kosong'})
    tempat_lahir:string

    @IsNotEmpty()
    @IsDate({message:"Format Tanggal Lahir salah"})
    // @IsInt()
    tanggal_lahir:Date

    @IsNotEmpty()
    @Length(10,10,{message:"NISN harus terdiri dari 10 karakter"})
    nisn:string

    @IsNotEmpty()
    @Length(16,16,{message:"NIK harus terdiri dari 16 karakter"})
    nik:string

    @IsNotEmpty()
    alamat:string

}

export class FindAllDto{
    @IsInt()
    @Type(() => Number)
    page = 1;

    @IsInt()
    @Type(() => Number)
    pageSize = 10;

    @IsOptional()
    @IsInt()
    limit:number

    @IsOptional()
    nama:string

    @IsOptional()
    email:string

    @IsOptional()
    @IsInt()
    @Type(() => String)
    tanggal_lahir:Date

    @IsOptional()
    tempat_lahir:string

    @IsOptional()
    nisn:string

    @IsOptional()
    nik:string

    @IsOptional()
    alamat:string
}

export class CreateDto extends OmitType(UtsDto, ['id']){}
export class UpdateDto extends UtsDto{}