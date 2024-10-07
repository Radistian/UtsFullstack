import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uts } from './uts.entity';
import { Repository } from 'typeorm';
import { CreateDto, FindAllDto, UpdateDto } from './uts.dto';
import { ResponseUts } from 'src/interface';
import BaseResponse from 'src/utils/response.utils';
import { constants } from 'buffer';

@Injectable()
export class UtsService extends BaseResponse {
  constructor(
    @InjectRepository(Uts) private readonly UtsRepository: Repository<Uts>,
  ) {
    super();
  }

  async findAll(query: FindAllDto): Promise<ResponseUts> {
    const {
      page,
      pageSize,
      nama,
      email,
      tempat_lahir,
      tanggal_lahir,
      nisn,
      nik,
      alamat,
      limit,
    } = query;

    const total = await this.UtsRepository.count();

    const result = await this.UtsRepository.find();
    console.log(result);

    return this._paginationUts('OK', result, total, page, total);
  }

  async create(payload: CreateDto): Promise<ResponseUts> {
    try {
      // const save = await this.UtsRepository.save(payload)
      const save = await this.UtsRepository.save(payload);
      return {
        status: 'ok',
        message: 'OK',
        data: save,
      };
    } catch (err) {
      throw new HttpException('Email sudah digunakan', 422);
    }
  }

  async detail(id: number): Promise<ResponseUts> {
    const result = await this.UtsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (result === null) {
      throw new NotFoundException('tidak nemu');
    }
    return {
      status: 'Success',
      message: 'OK',
      data: result,
    };
  }
  ///update radis utama
  async update(id: number, payload: UpdateDto): Promise<ResponseUts> {
    const result = await this.UtsRepository.update(id, payload);

    const data = await this.UtsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new NotFoundException('ok');
    }
    if (data.email === payload.email) {
      throw new HttpException('Email sudah digunakan siswa lain', 422);
    }
    return {
      status: 'Success',
      message: 'ok',
      data: data,
    };
  }
  ///Update radis coba1
  //   async update(id: number, payload: UpdateDto): Promise<ResponseUts> {
  //     const data = await this.UtsRepository.findOne({
  //       where: {
  //         id: id,
  //       },
  //     });

  //     if (!data) {
  //       throw new NotFoundException('User tidak ditemukan');
  //     }

  //     const existingUser = await this.UtsRepository.findOne({
  //       where: {
  //         email: payload.email,
  //       },
  //     });

  //     if (existingUser && existingUser.id !== id) {
  //       throw new HttpException('Email sudah digunakan siswa lain', 422);
  //     }
  //     await this.UtsRepository.update(id, payload);
  //     const updatedData = await this.UtsRepository.findOne({ where: { id } });

  //     return {
  //       status: 'Success',
  //       message: 'Update berhasil',
  //       data: updatedData,
  //     };
  //   }
  ///Update radis coba 2
  //   async update(id: number, payload: UpdateDto): Promise<ResponseUts> {
  //     const data = await this.UtsRepository.findOne({
  //       where: { id },
  //     });
  //     await this.UtsRepository.update(id, payload);
  //     const result = await this.UtsRepository.findOne({ where: { id } });
  //     if (!data) {
  //       throw new NotFoundException('ok');
  //     }
  //     if (data.email === payload.email) {
  //       throw new HttpException('Email sudah digunakan siswa lain', 422);
  //     }

  //     return {
  //       status: 'Success',
  //       message: 'ok',
  //       data: result,
  //     };
  //   }
  // }

}
