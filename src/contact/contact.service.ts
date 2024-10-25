import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ReadContactDto } from './dto/read-contact.dto';
import { AuthService } from 'src/auth/auth.service';
import axios from 'axios';

@Injectable()
export class ContactService {
  constructor(private authService: AuthService) {}

  async create(createContact?: CreateContactDto): Promise<ReadContactDto | null> {
    if (!createContact) {
      throw new HttpException(
        'Insert name and firstName, lastName!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const authClientData = {
      clientId: process.env.CLIENT_ID,
      serviceUrl: process.env.SERVICE_URL,
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
        name: createContact?.name,
        first_name: createContact?.firstName,
        last_name: createContact?.lastName,
      },
    };
    console.log(`Created leads: ${data}`);
    return (
      await axios.post(
        `https://${auth.base_domain}/api/v4/contacts`,
        data,
        config,
      )
    ).data._embedded.contacts[0].id;
  }
}
