import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProjectDto } from '../models/dto/admin/create-project.dto';
import { UpdateProjectDto } from '../models/dto/admin/update-project.dto';

export class ProjectRepository extends Repository<Project> {
  private logger = new Logger('ProjectRepository', { timestamp: true });

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {
    super(
      projectRepository.target,
      projectRepository.manager,
      projectRepository.queryRunner,
    );
  }

  async findProjectsByUserIdForPortfolio(userId: string): Promise<Project[]> {
    this.logger.verbose(
      `Finding projects by UserId for portfolio. UserId: ${userId}`,
    );
    return await this.projectRepository.find({
      where: {
        isDisplayed: true,
        user: { id: userId },
      },
    });
  }

  async findProjectsByUserId(userId: string): Promise<Project[]> {
    this.logger.verbose(`Finding projects by UserId. UserId: ${userId}`);
    return await this.projectRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async createProject(
    id: string,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const { title, subtitle, date, projectLink, imageLink, isDisplayed } =
      createProjectDto;
    this.logger.verbose(`Creating new project entity for user. ID: ${id}`);

    const project = this.projectRepository.create({
      title,
      subtitle,
      date,
      projectLink,
      imageLink,
      isDisplayed,
      user: { id },
    });

    return await this.projectRepository.save(project);
  }

  async updateProject(
    project: Project,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    this.logger.verbose(
      `Updating a project. ID: ${project.id}, Data: ${JSON.stringify(
        updateProjectDto,
      )}`,
    );
    try {
      const response = (
        await this.projectRepository
          .createQueryBuilder()
          .update(Project)
          .set(updateProjectDto)
          .where('id = :id', {
            id: project.id,
          })
          .returning('*')
          .execute()
      ).raw[0];

      const result = {
        ...response,
        user: { id: response.userId },
      };
      delete result.userId;

      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
