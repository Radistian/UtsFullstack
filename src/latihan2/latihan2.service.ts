import { Injectable } from '@nestjs/common';
import { query } from 'express';
import { filter } from 'rxjs';

@Injectable()
export class Latihan2Service {

    soal1(){
        return{
            msg : "success",
            filter : {
                id : 1,
                page_size : 10
            }
        }
    }

    soal2(id:string){
        return{
            status : 'success',
            msg : `user dengan id ${id} berhasil ditemukan`
        }
    }

    soal3(payload:any){
        return{
            status : "success",
            msg : 'Berhasil disimpan',
            payload: payload 
        }
    }

    soal4(id:string){
        return{
            status : 'success',
            msg : `user dengan id ${id} berhasil di hapus`
        }
    }
}
