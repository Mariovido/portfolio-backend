import { Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Technology } from './entities/technology.entity';
import { CreateTechnologyDto } from '../models/dto/admin/create-technology.dto';
import { UpdateTechnologyDto } from '../models/dto/admin/update-technology.dto';
import { Project } from './entities/project.entity';

export class TechnologyRepository extends Repository<Technology> {
  private logger = new Logger('TechnologyRepository', { timestamp: true });

  constructor(
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
  ) {
    super(
      technologyRepository.target,
      technologyRepository.manager,
      technologyRepository.queryRunner,
    );
  }

  async findTechnologyByProjects(projects: Project[]): Promise<Technology[]> {
    this.logger.verbose(`Finding technologies by projects.`);
    const technologyList: Technology[] = [];
    for (const project of projects) {
      const technology = await this.technologyRepository.find({
        where: {
          project: { id: project.id },
        },
      });

      technology.forEach((technologyAux) => {
        const projectAux = new Project();
        projectAux.id = project.id;
        technologyAux.project = projectAux;
        technologyList.push(technologyAux);
      });
    }

    return technologyList;
  }

  async createTechnology(
    id: string,
    createTechnologyDto: CreateTechnologyDto,
  ): Promise<Technology> {
    const { technologyName, project } = createTechnologyDto;
    this.logger.verbose(`Creating new interest entity for user. ID: ${id}`);

    const technology = this.technologyRepository.create({
      technologyName,
      project: { id: project },
    });

    return await this.technologyRepository.save(technology);
  }

  async updateTechnology(
    technology: Technology,
    updateTechnologyDto: UpdateTechnologyDto,
  ): Promise<Technology> {
    this.logger.verbose(
      `Updating a interest. ID: ${technology.id}, Data: ${JSON.stringify(
        updateTechnologyDto,
      )}`,
    );
    try {
      const response = (
        await this.technologyRepository
          .createQueryBuilder()
          .update(Technology)
          .set(updateTechnologyDto)
          .where('id = :id', {
            id: technology.id,
          })
          .returning('*')
          .execute()
      ).raw[0];

      const result = {
        ...response,
        project: { id: response.projectId },
      };
      delete result.userId;

      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
