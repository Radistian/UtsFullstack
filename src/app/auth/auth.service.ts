import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import BaseResponse from 'src/utils/response.utils';
import { User } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './auth.dto';
import { ResponseSuccess } from 'src/interface';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends BaseResponse {
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
    private jwtService : JwtService,
  ) {
    super();
  }

  generateJWT(payload: jwtPayload, expiresIn: string | number, token: string) {
    return this.jwtService.sign(payload, {
      secret: token,
      expiresIn: expiresIn,
    });
  } 

  async register(payload: RegisterDto): Promise<ResponseSuccess> {

    //Cek email ada atau ga
    const checkUserExist = await this.authRepository.findOne({
        where : {
            email : payload.email,
        },
    });
    if(checkUserExist){
        throw new HttpException("email sudah digunakan",HttpStatus.FOUND)
    }

    //Hash password
    payload.password = await hash(payload.password, 12)
    //Hash password

    await this.authRepository.save(payload)
    return this._success("Register Berhasil")

  }

  async login(payload: LoginDto): Promise<ResponseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        nama: true,
        email: true,
        password: true,
        refresh_token: true,
      },
    });

    if (!checkUserExists) {
      throw new HttpException(
        'User tidak ditemukan',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const checkPassword = await compare(
      payload.password,
      checkUserExists.password,
    ); // compare password yang dikirim dengan password yang ada di tabel
    if (checkPassword) {

      const jwtPayload : jwtPayload = {
        id : checkUserExists.id,
        email : checkUserExists.email,
        nama : checkUserExists.nama
      }

      const access_token = this.generateJWT(
        jwtPayload,
        '1d',
        process.env.ACCESS_TOKEN_SECRET,
      );
      return this._success('Login Success', {...checkUserExists, access_token});
    } else {
      throw new HttpException(
        'email dan password tidak sama',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
