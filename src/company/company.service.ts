import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ReadCompanyDto } from './dto/read-company.dto';
import axios from 'axios';

@Injectable()
export class CompanyService {
  constructor(private authService: AuthService) {}

  async create(createCompany?: CreateCompanyDto): Promise<ReadCompanyDto | null> {
    if (!createCompany) {
      throw new HttpException('Insert name and price!', HttpStatus.BAD_REQUEST);
    }
    const authClientData = {
      clientId: '32022914',
      serviceUrl: 'https://app2.gnzs.ru/amocrm/test/oauth/get-token.php',
    };
    const auth = await this.authService.authorization(authClientData);
    const config = {
      headers: {
        'Content-Type': 'contenttype=application/json',
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
    const data = {
      data: {
        name: createCompany?.name,
      },
    };
    console.log(`Created company: ${data}`);
    return (
      await axios.post(
        `https://${auth.base_domain}/api/v4/companies`,
        data,
        config,
      )
    ).data._embedded.companies[0].id;
  }
}
