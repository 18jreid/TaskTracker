import { Body, Controller, Get, Post, Delete, Param, HttpException } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { ProjectsService } from '../providers/services/projects.service';
import { Project } from 'server/entities/project.entity';


class ProjectPostBody {
  description: string;
}

@Controller()
export class ProjectsController {
  constructor(private projectsService: ProjectsService){}

  @Get('/projects')
  public async index(@JwtBody() JwtBody: JwtBodyDto){
    const projects = await this.projectsService.findAllForUser(JwtBody.userId);
    return projects;
  }

  @Post('/projects')
  public async create (@JwtBody() JwtBody: JwtBodyDto, @Body() body: ProjectPostBody){
    let newProject = new Project();
    newProject.description = body.description;
    const project = await this.projectsService.createProject(newProject);
    return { project };
  }

  @Delete('/projects:id')
  public async destroy (@Param('id') id: string, @JwtBody() JwtBody: JwtBodyDto){
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    if (project.createdByUser.id !== JwtBody.userId) {
      throw new HttpException("Unauthorized", 401);
    }
    this.projectsService.deleteProject(project);
    return { success: true };
  }
}
