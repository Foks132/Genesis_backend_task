import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ReadAuthDto } from './dto/read-auth.dto';
import axios from 'axios';

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

  async getAuthorization(): Promise<ReadAuthDto | null> {
    const authClientData = {
      clientId: process.env.CLIENT_ID,
      serviceUrl: process.env.SERVICE_URL,
    };
    return await this.authorization(authClientData);
  }
}
