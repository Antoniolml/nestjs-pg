import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: AuthDto) {
    const userValidate = await this.authService.validateUser(
      username,
      password,
    );

    if (!userValidate) throw new UnauthorizedException('Invalid credentials');

    const jwt = await this.authService.generateJWT(userValidate);
    return jwt;
  }
}
