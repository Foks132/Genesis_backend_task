import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, AuthService],
})
export class OrderModule {}
