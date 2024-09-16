import { Controller, Get, Post, Put, Delete, Patch } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post()
  create():string {
    return "ok"
  }

  @Put()
  update():string {
    return "ini method data"
  }

  @Post('tes')
  create2():string {
    return "ok tes"
  }

  @Get()
  getHello(): string {
    return "Belajar Routing NestJS"
  }
  
  @Get("list")
  getHello2(): string {
    return "Belajar Routing NestJS 2"
  }
}
