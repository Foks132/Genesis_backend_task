import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.authorization(loginAuthDto);
  }
}
