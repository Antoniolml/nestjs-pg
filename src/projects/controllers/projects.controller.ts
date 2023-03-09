import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { ProjectsService } from '../services/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @Get(':id')
  public async findProjectById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.projectService.findProjectById(id);
  }

  @Post()
  public async createProject(@Body() body: ProjectDTO) {
    return await this.projectService.createProject(body);
  }

  @Put(':id')
  public async updateProject(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectService.updateproject(body, id);
  }

  @Delete(':id')
  public async deleteProject(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.projectService.deleteProject(id);
  }
}
