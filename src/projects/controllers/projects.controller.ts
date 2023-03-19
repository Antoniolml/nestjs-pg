import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { ProjectsService } from '../services/projects.service';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @ApiParam({ name: 'projectId' })
  @Get(':projectId')
  public async findProjectById(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.findProjectById(id);
  }

  @ApiParam({ name: 'userId' })
  @Roles('CREATOR')
  @Post('/userOwner/:userId')
  public async createProject(
    @Body() body: ProjectDTO,
    @Param('userId') userId: string,
  ) {
    return await this.projectService.createProject(body, userId);
  }

  @ApiParam({ name: 'projectId' })
  @AccessLevel('OWNER')
  @Put(':projectId')
  public async updateProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectService.updateproject(body, id);
  }

  @ApiParam({ name: 'projectId' })
  @AccessLevel('OWNER')
  @Delete(':projectId')
  public async deleteProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.deleteProject(id);
  }
}
