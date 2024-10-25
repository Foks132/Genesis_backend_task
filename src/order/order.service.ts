import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ReadOrderDto } from './dto/read-order.dto';
import { AuthService } from 'src/auth/auth.service';
import axios from 'axios';

@Injectable()
export class OrderService {
  constructor(private authService: AuthService) {}

  async create(createOrder?: CreateOrderDto): Promise<ReadOrderDto | null> {
    if (!createOrder) {
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
        name: createOrder?.name,
        price: createOrder?.price,
      },
    };
    console.log(`Created leads: ${data}`);
    return (
      await axios.post(`https://${auth.base_domain}/api/v4/leads`, data, config)
    ).data._embedded.leads[0].id;
  }
}
