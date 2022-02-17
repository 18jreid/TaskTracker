import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'server/entities/project.entity';


@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ){}

    findAllForUser(userID: number): Promise<Project[]> {
        return this.projectRepository.find({
            where: { userID, },
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
}

