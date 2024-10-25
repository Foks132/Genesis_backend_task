import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ClsService } from 'nestjs-cls';
import { ReadCompanyDto } from './dto/read-company.dto';
import axios from 'axios';

@Injectable()
export class CompanyService {
  constructor(private readonly clsService: ClsService) { }

  async create(createCompany?: CreateCompanyDto): Promise<ReadCompanyDto | null> {
    if (!createCompany) {
      throw new HttpException('Insert data!', HttpStatus.BAD_REQUEST);
    }
    const config = {
      headers: {
        'Content-Type': 'contenttype=application/json',
        Authorization: `Bearer ${this.clsService.get('accessToken')}`,
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
        `https://${this.clsService.get('baseDomain')}/api/v4/companies`,
        data,
        config,
      )
    ).data._embedded.companies[0].id;
  }
}
