import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { projectsEntity } from './entities/projects.entity';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([projectsEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
