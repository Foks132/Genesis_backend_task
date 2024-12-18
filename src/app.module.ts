import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ContactModule } from './contact/contact.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AuthModule,
    OrderModule,
    ContactModule,
    CompanyModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
