import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_TASK } from 'src/constants/status-tasks';
import { ProjectDTO } from 'src/projects/dto/project.dto';

export class TasksDTO {
  @ApiProperty({ example: 'Task 1' })
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @ApiProperty({ example: 'Description of task 1' })
  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @ApiProperty({ example: 'FINISHED' })
  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @ApiProperty({ example: 'Marco Perez' })
  @IsNotEmpty()
  @IsString()
  responsableName: string;

  @ApiProperty()
  @IsOptional()
  projectId?: ProjectDTO;
}
