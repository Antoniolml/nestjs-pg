import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthBody } from '../interfaces/auth.interface';

export class AuthDto implements AuthBody {
  @ApiProperty({ example: 'pepito' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
