import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { query } from 'express';
import { BookDto, CreateBookDto, FindBookDto, UpdateBookDto } from './book.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('book')
export class BookController {
    constructor(private bookService:BookService){}

    @Put('update/:id')
    async update(@Body()payload:UpdateBookDto, @Param('id')id:string){
        return this.bookService.update(+id, payload)
    }

    @Get('list')
    async findAllBook(@Pagination()query:FindBookDto){
        return this.bookService.findAllBook(query)
    }

    @Get('detail/:id')
    async detail(@Param('id')id:number){
        return this.bookService.detail(+id)
    }

    @Post('create')
    async createBook(@Body()payload:CreateBookDto){
        // console.log(payload,BookDto.arguments)
        return this.bookService.create(payload)
    }

    @Delete('delete/:id')
    async deleteBook(@Param("id")id:number){
        return this.bookService.delete(id)
    }

    @Delete('delete')
    async deleteMulti(@Query("id")id:string){
        const idArray = id.split(',')
        return this.bookService.deleteMulti(idArray)
    }
}
