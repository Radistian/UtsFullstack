import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LatihanModule } from './latihan/latihan.module';
import { Latihan2Module } from './latihan2/latihan2.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { UtsModule } from './uts/uts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory : async () =>{
        const {typeOrmConfig} = await import('./config/typeorm.config')
        return typeOrmConfig
      }
    }),
    LatihanModule, Latihan2Module, BookModule, UtsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
