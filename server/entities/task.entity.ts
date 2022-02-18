import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity'

@Entity()
export class Task {

  @PrimaryGeneratedColumn()
  taskID: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  // an estimation of time to complete in minutes
  @Column({ nullable: false })
  timeEstimation: number;

  // here we can say that 1 will be complete and 0 will be incomplete
  @Column({ nullable: false })
  status: number;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  // the assigned user for this task (many tasks to one user)
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  // the project this task belongs to
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
