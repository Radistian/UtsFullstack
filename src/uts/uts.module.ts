import { Module } from '@nestjs/common';
import { UtsController } from './uts.controller';
import { UtsService } from './uts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uts } from './uts.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Uts])],
  controllers: [UtsController],
  providers: [UtsService]
})
export class UtsModule {}
