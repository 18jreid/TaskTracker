import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'server/entities/project.entity';
import { ProjectUsers } from 'server/entities/project_users.entity';


@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(ProjectUsers)
        private projectUsersRepository: Repository<ProjectUsers>
    ){}

    async findAllForUser(userId: number): Promise<Project[]> {
        return await this.projectRepository.find({
            where: { createdByUserId: userId },
        });
    }

    findProjectById(projectID: number) {
        return this.projectRepository.findOne({
            where: { projectID, },
        });
    }

    createProject(project: Project): Promise<Project> {
        return this.projectRepository.save(project);
    }

    deleteProject(project: Project) {
        return this.projectRepository.delete(project);
    }

    async findAllUsersForProject(givenId: number): Promise<ProjectUsers[]> {
        return await this.projectUsersRepository.find({
            where: { projectId: givenId },
        });
    }

    async findAllProjectsForUser(givenId: number): Promise<ProjectUsers[]> {
        return this.projectUsersRepository.find({
            where: { userId: givenId },
        });
    }

    async setProjectToCompleted(givenId: number) {

        const targetProject = await this.projectRepository.update({ id: givenId }, {status:2});

        return targetProject;
    }

    async setProjectToInProgress(givenId: number) {

        const targetProject = await this.projectRepository.update({ id: givenId }, {status: 1});

        return targetProject;
    }

    async setProjectToNotStarted(givenId: number) {

        const targetProject = await this.projectRepository.update({ id: givenId }, {status: 0});

        return targetProject;
    }

    createProjectUser(projectUsers: ProjectUsers): Promise<ProjectUsers> {
        return this.projectUsersRepository.save(projectUsers);
    }

    deleteProjectUser(projectUsers: ProjectUsers) {
        return this.projectUsersRepository.delete(projectUsers);
    }
}

