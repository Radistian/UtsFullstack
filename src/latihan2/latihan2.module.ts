import { Module } from '@nestjs/common';
import { Latihan2Controller } from './latihan2.controller';
import { Latihan2Service } from './latihan2.service';

@Module({
  controllers: [Latihan2Controller],
  providers: [Latihan2Service]
})
export class Latihan2Module {}
