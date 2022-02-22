import { Body, Controller, Get, Post, Delete, Param, HttpException } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { ProjectsService } from '../providers/services/projects.service';
import { Project } from 'server/entities/project.entity';
import { ProjectUsers } from 'server/entities/project_users.entity';

class ProjectPostBody {
  title: string;
  description: string;
  status: number;
}

@Controller()
export class ProjectsController {
  constructor(private projectsService: ProjectsService,
    ){}

  @Get('/projects')
  public async index(@JwtBody() JwtBody: JwtBodyDto){
    const projects = await this.projectsService.findAllProjectsForUser(JwtBody.userId);
    return projects;
  }

  @Post('/projects')
  public async create (@JwtBody() JwtBody: JwtBodyDto, @Body() body: ProjectPostBody){
    let newProject = new Project();
    newProject.title = body.title;
    newProject.description = body.description;
    newProject.status = body.status;
    newProject.createdByUserId = JwtBody.userId;
    newProject.teamLeadId = JwtBody.userId;
    const project = await this.projectsService.createProject(newProject);

    const newProjectUser = new ProjectUsers();
    newProjectUser.projectId = project.id;
    newProjectUser.userId = JwtBody.userId;
    const addedProjectUser = await this.projectsService.createProjectUser(newProjectUser);

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
