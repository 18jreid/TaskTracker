import { Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToMany, OneToOne, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';


@Entity()
export class Project {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  // here we can say that 1 will be complete and 0 will be incomplete
  @Column({ nullable: false })
  status: number

  @Column()
  createdByUserId: number;

  @Column()
  teamLeadId: number;

  // the user who created this projects
  @OneToOne(() => User)
  createdByUser: User;

  // the current team lead user
  @OneToOne(() => User)
  teamLead: User;

  // tasks for this project
  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
  
  // users working on this project
  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
