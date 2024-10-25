import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClsService } from 'nestjs-cls';
import { ReadOrderDto } from './dto/read-order.dto';
import axios from 'axios';

@Injectable()
export class OrderService {
  constructor(private readonly clsService: ClsService) { }

  async create(createOrder?: CreateOrderDto): Promise<ReadOrderDto | null> {
    if (!createOrder) {
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
        name: createOrder?.name,
        price: createOrder?.price,
      },
    };
    console.log(`Created leads: ${data}`);
    return (
      await axios.post(`https://${this.clsService.get('baseDomain')}/api/v4/leads`, data, config)
    ).data._embedded.leads[0].id;
  }
}
