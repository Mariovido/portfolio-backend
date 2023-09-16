import { Repository } from 'typeorm';
import { BulletPoint } from './entities/bullet-point.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBulletPointDto } from '../models/dto/admin/create-bullet-point.dto';
import { UpdateBulletPointDto } from '../models/dto/admin/update-bullet-point.dto';
import { Project } from './entities/project.entity';
import { WorkExperience } from './entities/work-experience.entity';

export class BulletPointRepository extends Repository<BulletPoint> {
  private logger = new Logger('BulletPointRepository', { timestamp: true });

  constructor(
    @InjectRepository(BulletPoint)
    private bulletPointRepository: Repository<BulletPoint>,
  ) {
    super(
      bulletPointRepository.target,
      bulletPointRepository.manager,
      bulletPointRepository.queryRunner,
    );
  }

  async findBulletPointByProjects(projects: Project[]): Promise<BulletPoint[]> {
    this.logger.verbose(`Finding bullet points by projects.`);
    const bulletPointList: BulletPoint[] = [];
    for (const project of projects) {
      const bulletPoint = await this.bulletPointRepository.find({
        where: {
          project: { id: project.id },
        },
      });

      bulletPoint.forEach((bulletPointAux) => {
        const projectAux = new Project();
        projectAux.id = project.id;
        bulletPointAux.project = projectAux;
        bulletPointList.push(bulletPointAux);
      });
    }

    return bulletPointList;
  }

  async findBulletPointByWorkExperiences(
    workExperiences: WorkExperience[],
  ): Promise<BulletPoint[]> {
    this.logger.verbose(`Finding bullet points by work experiences.`);
    const bulletPointList: BulletPoint[] = [];
    for (const workExperience of workExperiences) {
      const bulletPoint = await this.bulletPointRepository.find({
        where: {
          workExperience: { id: workExperience.id },
        },
      });

      bulletPoint.forEach((bulletPointAux) => {
        const workExperienceAux = new WorkExperience();
        workExperienceAux.id = workExperience.id;
        bulletPointAux.workExperience = workExperienceAux;
        bulletPointList.push(bulletPointAux);
      });
    }

    return bulletPointList;
  }

  async createBulletPoint(
    id: string,
    createBulletPointDto: CreateBulletPointDto,
  ): Promise<BulletPoint> {
    const { bulletPoint, workExperience, project } = createBulletPointDto;
    this.logger.verbose(`Creating new bullet point entity for user. ID: ${id}`);

    let bulletPointEntity;
    if (workExperience)
      bulletPointEntity = this.bulletPointRepository.create({
        bulletPoint,
        workExperience: { id: workExperience },
      });

    if (project)
      bulletPointEntity = this.bulletPointRepository.create({
        bulletPoint,
        project: { id: project },
      });

    return await this.bulletPointRepository.save(bulletPointEntity);
  }

  async updateBulletPoint(
    bulletPoint: BulletPoint,
    updateBulletPointDto: UpdateBulletPointDto,
  ): Promise<BulletPoint> {
    this.logger.verbose(
      `Updating a bullet point. ID: ${bulletPoint.id}, Data: ${JSON.stringify(
        updateBulletPointDto,
      )}`,
    );

    try {
      const response = (
        await this.bulletPointRepository
          .createQueryBuilder()
          .update(BulletPoint)
          .set(updateBulletPointDto)
          .where('id = :id', {
            id: bulletPoint.id,
          })
          .returning('*')
          .execute()
      ).raw[0];

      let result;
      if (response.projectId) {
        result = {
          ...response,
          project: { id: response.projectId },
        };
        delete result.workExperienceId;
      }

      if (response.workExperienceId) {
        result = {
          ...response,
          workExperience: { id: response.workExperienceId },
        };
        delete result.projectId;
      }

      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
