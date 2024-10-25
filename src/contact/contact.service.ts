import { HttpException, HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ClsService } from 'nestjs-cls';
import { ReadContactDto } from './dto/read-contact.dto';
import axios from 'axios';

@Injectable()
export class ContactService {
  constructor(private readonly clsService: ClsService) { }

  async create(createContact?: CreateContactDto): Promise<ReadContactDto | null> {
    if (!createContact) {
      throw new HttpException(
        'Insert data!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const config = {
      headers: {
        'Content-Type': 'contenttype=application/json',
        Authorization: `Bearer ${this.clsService.get('accessToken')}`,
      },
    };
    const data = {
      data: {
        name: createContact?.name,
        first_name: createContact?.firstName,
        last_name: createContact?.lastName,
      },
    };
    console.log(`Created contact: ${data}`);
    return (
      await axios.post(
        `https://${this.clsService.get('baseDomain')}/api/v4/contacts`,
        data,
        config,
      )
    ).data._embedded.contacts[0].id;
  }
}
