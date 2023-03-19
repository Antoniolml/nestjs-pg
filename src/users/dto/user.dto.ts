import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { projectsEntity } from 'src/projects/entities/projects.entity';
import { ACCESS_LEVEL, ROLES } from '../../constants/roles';
import { UsersEntity } from '../entities/users.entity';

export class UserDTO {
  @ApiProperty({ example: 'Marco' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Perez' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ example: 'marperes@gmail.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'marperes' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'DEVELOPER' })
  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}

export class UserUpdateDTO {
  @ApiProperty({ example: 'Marco' })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Perez' })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 20 })
  @IsOptional()
  @IsNumber()
  age: number;

  @ApiProperty({ example: 'marperes@gmail.com' })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({ example: 'marperes' })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ example: '123456' })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ example: 'DEVELOPER' })
  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;
}

export class UserToProjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user: UsersEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  project: projectsEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accessLevel: ACCESS_LEVEL;
}
