import { OmitType } from "@nestjs/mapped-types"
import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsOptional, Length, Max, Min, MinLength } from "class-validator"
import { title } from "process"


export class BookDto{
    
    @IsOptional()
    id:number 

    @IsNotEmpty({message : "title tidak bolek kosong"})
    @Length(5, 100, {message:"harus minimal 5 karakter"})
    title:string

    @IsNotEmpty()
    author:string
    
    @IsInt()
    @Min(2020)
    @Max(2024)
    year:number

    @IsNotEmpty()
    @MinLength(10)
    deskripsi:string
}

export class CreateBookDto extends OmitType(BookDto, ['id']){}
export class UpdateBookDto extends BookDto{}

export class FindBookDto{
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
    title :string

    @IsOptional()
    author :string

    @IsOptional()
    deskripsi:string

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    from_year:number

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    to_year:number

    @IsOptional()
    keyword:string
}

[
    {
        title : 'nestJs'
    },
    {
        author : 'ihsan'
    },
    {
        deskripsi: 'buku ini bagus'
    }
]