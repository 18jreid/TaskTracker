import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from 'server/controllers/projects.controller';
import { Project } from 'server/entities/project.entity';
import { ProjectUsers } from 'server/entities/project_users.entity';
import { ProjectsService } from '../providers/services/projects.service';



@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectUsers])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}