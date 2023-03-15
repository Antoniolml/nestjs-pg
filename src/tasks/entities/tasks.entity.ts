import { BaseEntity } from '../../config/base.entity';
import { STATUS_TASK } from '../../constants/status-tasks';
import { projectsEntity } from '../../projects/entities/projects.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'tasks' })
export class TasksEntity extends BaseEntity {
  @Column()
  taskName: string;

  @Column()
  taskDescription: string;

  @Column({ type: 'enum', enum: STATUS_TASK })
  status: STATUS_TASK;

  @Column()
  responsableName: string;

  @ManyToOne(() => projectsEntity, (project) => project.tasks)
  @JoinColumn({ name: 'projectId' })
  project: projectsEntity;
}
