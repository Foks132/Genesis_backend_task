import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService, AuthService],
})
export class ContactModule {}
