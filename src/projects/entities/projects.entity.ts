import { BaseEntity } from '../../config/base.entity';
import { IProject } from '../../interfaces/project.interface';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { TasksEntity } from '../../tasks/entities/tasks.entity';

@Entity({ name: 'projects' })
export class projectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => UsersProjectsEntity,
    (usersProjects) => usersProjects.project,
  )
  usersIncludes: UsersProjectsEntity[];

  @OneToMany(() => TasksEntity, (task) => task.project)
  tasks: TasksEntity[];
}
