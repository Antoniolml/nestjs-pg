import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectDTO {
  @ApiProperty({ example: 'Project 1' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Description of project 1' })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class ProjectUpdateDTO {
  @ApiProperty({ example: 'Project 1' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Description of project 1' })
  @IsOptional()
  @IsString()
  description: string;
}
