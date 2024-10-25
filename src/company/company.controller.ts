import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { AuthInterceptor } from 'src/auth/auth.interceptor';

@Controller('company')
@UseInterceptors(AuthInterceptor)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  async create(@Body() createCompany: CreateCompanyDto) {
    return await this.companyService.create(createCompany);
  }
}
