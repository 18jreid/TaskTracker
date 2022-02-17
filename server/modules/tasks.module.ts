import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from 'server/controllers/tasks.controller';
import { Task } from 'server/entities/task.entity';
import { TasksService } from '../providers/services/tasks.service';


@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TypeOrmModule],
})
export class TasksModule {}
