import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'server/entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAllForUser(user: number) {
    //console.log("tasksService looks for tasks with userId: ", user)
    const results = await this.taskRepository.find({
      where: { userId: user },
    });
    // console.log("tasksService returns: ", results)
    return results;
  }

  async findAllTasksForProject(id: number) {
    //console.log("tasksService looks for tasks with userId: ", user)
    const results = await this.taskRepository.find({
      where: { projectId: id },
    });
    // console.log("tasksService returns: ", results)
    return results;
  }

  async assignTaskToUserId(targetTaskId: number, targetUserId: number) {

    const targetTask = await this.taskRepository.update({ taskID: targetTaskId }, {userId: targetUserId});

    return targetTask;
}

  findTaskById(taskID: number) {
    return this.taskRepository.findOne({
      where: { taskID },
    });
  }

  createTask(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  deleteTask(task: Task) {
    return this.taskRepository.delete(task);
  }
}
