import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { UtsService } from './uts.service';
import { CreateDto, FindAllDto, UpdateDto } from './uts.dto';

@Controller('siswa')
export class UtsController {
  constructor(private UtsService: UtsService) {}

  @Get('list')
  async findAll(@Pagination() query: FindAllDto) {
    return this.UtsService.findAll(query);
  }

  @Post('create')
  async create(@Body() payload: CreateDto) {
    return this.UtsService.create(payload);
  }

  @Get('detail/:id')
  async detail(@Param('id') id: number) {
    return this.UtsService.detail(id);
  }

  @Put('update/:id')
  async update(@Body() payload: UpdateDto, @Param('id') id: string) {
    return this.UtsService.update(+id, payload);
  }
}
