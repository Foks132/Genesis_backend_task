import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { AuthInterceptor } from 'src/auth/auth.interceptor';

@Controller('contact')
@UseInterceptors(AuthInterceptor)
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return await this.contactService.create(createContactDto);
  }
}
