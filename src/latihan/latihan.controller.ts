import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { query } from 'express';
import { LatihanService } from './latihan.service';

@Controller('latihan')
export class LatihanController {
    constructor(
        private readonly latihanService:LatihanService
    ){}

    @Get()
    findAll(@Query() query:any){
        return this.latihanService.findAll(query)
    }

    // @Get()
    // findAll(@Query() query:any){
    //     return{
    //         method:'GET',
    //         query : query
    //     }
    // }

    @Get('detail/:id/:name')
    detail(@Param('id')id:string, @Param('name')name:string){
        return this.latihanService.findDetail(id, name)
    }

    @Post("simpan")
    register(@Body()payload:any){
        return this.latihanService.register(payload)
    }

    @Put("update/:id")
    update(@Param('id')id:number, @Body()payload:any){
        return{
            method : "PUT",
            id_user : id,
            payload : payload
        }
    }
}
