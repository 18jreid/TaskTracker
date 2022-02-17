import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'server/entities/task.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ){}

    findAllForUser(userID: number): Promise<Task[]> {
        return this.taskRepository.find({
            where: { userID, },
        });
    }

    findTaskById(taskID: number) {
        return this.taskRepository.findOne({
            where: { taskID, },
        });
    }

    createTask(task: Task): Promise<Task> {
        return this.taskRepository.save(task);
    }

    deleteTask(task: Task) {
        return this.taskRepository.delete(task);
    }
}

