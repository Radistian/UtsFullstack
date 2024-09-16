import { IsNotEmpty, IsOptional, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";



export class UtsDto{
    
    @IsOptional()
    id:number

    @IsNotEmpty()
    nama:string

    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    tempat_lahir:string

    @IsInt()
    tanggal_lahir:number

    @IsNotEmpty()
    nisn:string

    @IsNotEmpty()
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