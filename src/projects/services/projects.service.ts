import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, projectsUpdateDTO } from '../dto/project.dto';
import { projectsEntity } from '../entities/projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(projectsEntity)
    private readonly projectsRepository: Repository<projectsEntity>,
  ) {}

  public async findProjects(): Promise<projectsEntity[]> {
    try {
      return await this.projectsRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findProjectById(id: string): Promise<projectsEntity> {
    try {
      return await this.projectsRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createProject(body: ProjectDTO): Promise<projectsEntity> {
    try {
      return await this.projectsRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateproject(
    body: projectsUpdateDTO,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const project: UpdateResult = await this.projectsRepository.update(
        id,
        body,
      );
      if (!project.affected) throw new Error('project not found');
      return project;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const project: DeleteResult = await this.projectsRepository.delete(id);
      if (!project.affected) throw new Error('project not found');
      return project;
    } catch (error) {
      throw new Error(error);
    }
  }
}
