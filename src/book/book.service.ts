import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Between, Like, Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response.utils';
import { CreateBookDto, FindBookDto, UpdateBookDto } from './book.dto';

@Injectable()
export class BookService extends BaseResponse {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {
    super()
  }

  //disini kita akan membuat api untuk mengakses semua data di tabel
  async findAllBook(query:FindBookDto): Promise<ResponsePagination> {
    console.log(query);
    
    const {page, pageSize, limit, title, author, deskripsi,from_year, to_year, keyword} = query

    const filter : {
      [key:string]:any
    } = {}

    const search : {
      [key:string]:any
    }[] = [];

    if(keyword){
      search.push(
        {
          title: Like(`%${keyword}%`)
        },
        {
          author: Like(`%${keyword}%`)
        },
        {
          deskripsi: Like(`%${keyword}%`)
        }
      )
    }else{
      if(title){
        filter.title = Like(`%${title}%`)
      }
  
      if(author){
        filter.author = Like(`%${author}%`)
      }
  
      if(deskripsi){
        filter.deskripsi = Like(`%${deskripsi}%`)
      }
  
      if(from_year && to_year){
        filter.year = Between(from_year, to_year)
      }
      
      if(from_year && !to_year){
        filter.year = Between(from_year, to_year)
      }
    }
    
    
    

    console.log(page, pageSize);

    const total = await this.bookRepository.count();

    const result = await this.bookRepository.find({
      where:keyword ? search : filter,
      skip: limit,
      take : Number(pageSize)
    });
    return this._pagination("Ok", result, total, page, pageSize)
    // return {
    //   status: 'success',
    //   msg: 'List buku ditemukan',
    //   data: result,
    // };
  }

  //menambah buku

  async create(payload: CreateBookDto): Promise<ResponseSuccess> {
    try {
      const save = await this.bookRepository.save(payload);
      return {
        status: 'success',
        msg: 'Buku berhasil ditambahkan',
        // data : data
      };
    } catch (err) {
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    } finally {
      console.log('Proses selesai');
    }
  }

  //Detail Book

  async detail(id: number): Promise<ResponseSuccess> {
    const result = await this.bookRepository.findOne({
      where: {
        id: id,
      },
    });

    if (result === null) {
      throw new NotFoundException('Buku Tidak ditemukan');
    }

    return {
      status: 'Success',
      msg: 'Detail buku berhasil ditemukan',
      data: result,
    };
  }

  async update(
    id: number,
    payload: UpdateBookDto,
  ): Promise<ResponseSuccess> {
    try {
      // const result = await this.bookRepository.save({
      //   title: payload.title,
      //   year: payload.year,
      //   deskripsi: payload.deskripsi,
      //   author: payload.author,
      //   id: id,
      // });

      const result = await this.bookRepository.update(
        {
          id: id,
        },
        {
          title: payload.title,
          year: payload.year,
          deskripsi: payload.deskripsi,
          author: payload.author,
          id: id,
        },
      );

      return {
        status: 'Success',
        msg: 'Update berhasil',
        data: result,
      };
    } catch  {
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<ResponseSuccess> {
    const deleted = await this.bookRepository.delete(id);

    if (deleted.affected === 0) {
      throw new HttpException('Data Tidak Ditemukan', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'Success',
      msg: 'Data Berhasil di hapus',
      data: deleted,
    };
  }

  async deleteMulti(array: string[]): Promise<ResponseSuccess> {
    const deleted = await this.bookRepository.delete(array);

    if (deleted.affected === 0) {
      throw new HttpException('Buku Tidak Ditemukan', HttpStatus.NOT_FOUND);
    }

    return{
      status: 'success',
      msg: `Berhasil mengahapus ${deleted.affected} buku`,
      data : deleted
    }
  }

}
