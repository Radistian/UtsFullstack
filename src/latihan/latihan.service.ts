import { Injectable } from '@nestjs/common';
import { query } from 'express';

@Injectable()
export class LatihanService {
    findAll(query:any){
        return{
            msg : "siap latihan service",
            params : query
        }
    }

    findDetail(id:string, name:string){
        return {
            method : 'GET',
            id : id,
            name : name
        }
    }

    register(payload :any){
        return {
            method : 'POST',
            payload : payload
        }
    }
}
