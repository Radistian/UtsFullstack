import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uts } from './uts.entity';
import { Repository } from 'typeorm';
import { CreateDto, FindAllDto } from './uts.dto';
import { ResponseUts } from 'src/interface';
import BaseResponse from 'src/utils/response.utils';
import { constants } from 'buffer';

@Injectable()
export class UtsService extends BaseResponse {
    constructor(
        @InjectRepository(Uts)private readonly UtsRepository:Repository<Uts>
    ){
        super()
    }

    async findAll(query:FindAllDto):Promise<ResponseUts>{
        
        const {page, pageSize, nama, email, tempat_lahir, tanggal_lahir, nisn, nik, alamat, limit} = query

        const total = await this.UtsRepository.count()

        const result = await this.UtsRepository.find({
            skip : limit
        })

        return this._paginationUts("OK", result, total, page, total)
    }

    async create(payload:CreateDto):Promise<ResponseUts>{
        try{
            const save = await this.UtsRepository.save(payload)
            return {
                status : "ok",
                message : 'ok'
            };
        }catch(err){
            throw new HttpException('ya',HttpStatus.BAD_REQUEST);
        }finally{
            console.log('ok');
        }
    }

    async detail(id:number):Promise<ResponseUts>{
        const result = await this.UtsRepository.findOne({
            where:{
                id : id
            }
        });
        if(result === null){
            throw new NotFoundException('tidak nemu')
        }
        return {
            status:"success",
            message:'ok',
            data:result
        }
    }
}
