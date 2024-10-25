import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthInterceptor } from 'src/auth/auth.interceptor';

@Controller('order')
@UseInterceptors(AuthInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async create(@Body() createOrderDtO: CreateOrderDto) {
    return await this.orderService.create(createOrderDtO);
  }
}
