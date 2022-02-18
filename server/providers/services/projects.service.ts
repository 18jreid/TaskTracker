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

    async findAllForUser(userId: number): Promise<Project[]> {
        return await this.projectRepository.find({
            where: { id: userId },
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

