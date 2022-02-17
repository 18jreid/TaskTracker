import { Body, Controller, Get, Post, Delete, Param, HttpException } from '@nestjs/common';
import { TasksService } from '../providers/services/tasks.service';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Task } from 'server/entities/task.entity';


class TaskPostBody {
  description: string;
}

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService){}

  @Get('/tasks')
  public async index(@JwtBody() JwtBody: JwtBodyDto){
    const tasks = await this.tasksService.findAllForUser(JwtBody.userId);
    return { tasks };
  }

  @Post('/tasks')
  public async create (@JwtBody() JwtBody: JwtBodyDto, @Body() body: TaskPostBody){
    let newTask = new Task();
    newTask.description = body.description;
    const task = await this.tasksService.createTask(newTask);
    return { task };
  }

  @Delete('/tasks:id')
  public async destroy (@Param('id') id: string, @JwtBody() JwtBody: JwtBodyDto){
    const task = await this.tasksService.findTaskById(parseInt(id, 10));
    if (task.user.id !== JwtBody.userId) {
      throw new HttpException("Unauthorized", 401);
    }
    this.tasksService.deleteTask(task);
    return { success: true };
  }
}
