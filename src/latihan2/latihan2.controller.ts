import { Controller, Get, Post, Delete, Query, Body, Param} from '@nestjs/common';
import { Latihan2Service } from './latihan2.service';
import { query } from 'express';
import { filter } from 'rxjs';

@Controller('latihan2')
export class Latihan2Controller {

    constructor(
        private readonly latihan2:Latihan2Service
    ){}

    @Get("tugas/list")
    list(){
        return this.latihan2.soal1()
    }

    @Get("tugas/:id/detail")
    detail(@Param('id')id:string){
        return this.latihan2.soal2(id)
    }

    @Post("tugas/simpan")
    simpan(@Body()payload:any){
        return this.latihan2.soal3(payload)
    }

    @Delete("tugas/:id/delete")
    delete(@Param('id')id:string){
        return this.latihan2.soal4(id)
    }
}
