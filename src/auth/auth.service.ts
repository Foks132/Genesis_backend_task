import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ReadAuthDto } from './dto/read-auth.dto';

@Injectable()
export class AuthService {
  
  async authorization(loginAuth?: LoginAuthDto): Promise<ReadAuthDto | null> {
    if (
      !loginAuth ||
      loginAuth.clientId == undefined ||
      loginAuth.serviceUrl == undefined
    ) {
      throw new HttpException(
        'Insert clientId and serviceUrl!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Id': loginAuth?.clientId,
      },
    };
    console.log(`Authorization: ${loginAuth?.clientId}`);
    return (await axios.get(loginAuth?.serviceUrl, config)).data;
  }
}
