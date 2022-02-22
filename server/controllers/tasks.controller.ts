import { Body, Controller, Get, Post, Delete, Param, HttpException } from '@nestjs/common';
import { TasksService } from '../providers/services/tasks.service';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Task } from 'server/entities/task.entity';


class TaskPostBody {
  title: string;
  status: number;
  timeEstimation: number;
  description: string;
  projectId: number;
}

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService){}

  @Get('/tasks')
  public async index(@JwtBody() JwtBody: JwtBodyDto){
    //console.log("tasksController looks for tasks with userId: ", JwtBody.userId)
    const tasks = await this.tasksService.findAllForUser(JwtBody.userId);
    //console.log("tasksController returns: ", tasks)
    return tasks;
  }

  @Post('/tasks/project')
  public async index1(@JwtBody() JwtBody: JwtBodyDto, @Body() body: TaskPostBody){
    const tasks = await this.tasksService.findAllTasksForProject(body.projectId);
    return tasks;
  }

  @Post('/tasks')
  public async create (@JwtBody() JwtBody: JwtBodyDto, @Body() body: TaskPostBody){
    let newTask = new Task();
    newTask.userId = JwtBody.userId;
    newTask.title = body.title;
    newTask.description = body.description;
    newTask.timeEstimation = body.timeEstimation;
    newTask.status = body.status;
    newTask.projectId = body.projectId;
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
